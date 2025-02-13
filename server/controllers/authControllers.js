const { generateToken } = require('../utils/jwtUtils');
const pool = require('../db/db');

/**
 * Registrar un nuevo usuario.
 */
const register = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existe = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        if (existe.rows.length > 0) {
            return res.status(400).json({ error: 'El correo ya está registrado' });
        }

        const nuevoUsuario = await pool.query(
            'INSERT INTO usuarios (email, password) VALUES ($1, $2) RETURNING *',
            [email, password]
        );

        res.status(201).json({ mensaje: 'Usuario registrado con éxito', usuario: nuevoUsuario.rows[0] });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

/**
 * Iniciar sesión y generar un token.
 */
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        const usuario = result.rows[0];

        if (!usuario || usuario.password !== password) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }

        const token = generateToken({ id: usuario.id, email: usuario.email });

        await pool.query('UPDATE usuarios SET token = $1 WHERE id = $2', [token, usuario.id]);

        res.json({ usuario: { id: usuario.id, email: usuario.email }, token });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

/**
 * Cerrar sesión y eliminar el token.
 */
const logout = async (req, res) => {
    try {
        await pool.query('UPDATE usuarios SET token = NULL WHERE id = $1', [req.user.id]);
        res.json({ mensaje: 'Sesión cerrada correctamente' });
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
        res.status(500).json({ error: 'Error al cerrar sesión' });
    }
};

module.exports = { register, login, logout };
