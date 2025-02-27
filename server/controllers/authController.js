// Importa el pool de conexiones a la base de datos
import pool from '../db/db.js';

// Función para manejar el login
const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Correo electrónico y contraseña son requeridos.' });
    }

    try {
        // Busca el usuario en la base de datos
        const user = await pool.query(
            'SELECT * FROM usuarios WHERE email = $1',
            [email]
        );

        if (user.rows.length === 0) {
            return res.status(401).json({ message: 'Credenciales incorrectas.' });
        }

        // Compara la contraseña proporcionada con la almacenada (sin hashing)
        if (password !== user.rows[0].password) {
            return res.status(401).json({ message: 'Credenciales incorrectas.' });
        }

        // Si las credenciales son válidas, devuelve una respuesta exitosa
        res.status(200).json({ message: 'Inicio de sesión exitoso.', user: user.rows[0] });
    } catch (error) {
        console.error('Error en el servidor:', error);
        res.status(500).json({ message: 'Error en el servidor.' });
    }
};

// Exporta la función login
export { login };