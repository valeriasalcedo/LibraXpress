import { generateToken } from '../utils/jwtUtils.js';

// Simulación de una base de datos de usuarios
const users = [
    { id: 1, username: 'admin', password: '1234' },
];

/**
 * Iniciar sesión y devolver un JWT.
 */
export const login = (req, res) => {
    const { username, password } = req.body;

    // Validar credenciales
    const user = users.find((u) => u.username === username && u.password === password);

    if (!user) {
        return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    const token = generateToken(user);

    res.json({ token }); // Devolver el JWT al cliente
};

/**
 * Verificar la sesión actual.
 */
export const verifySession = (req, res) => {
    res.json({ isAuthenticated: true, user: req.user });
};

/**
 * Cerrar sesión (solo borra el token en el cliente).
 */
export const logout = (req, res) => {
    res.json({ mensaje: 'Sesión cerrada. Borra el token en el cliente.' });
};
