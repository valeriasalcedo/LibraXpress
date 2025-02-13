const jwt = require('jsonwebtoken');
const pool = require('../db/db');
require('dotenv').config();

/**
 * Middleware para autenticar usuarios con JWT.
 */
const authenticateUser = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Acceso denegado. No hay token.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const result = await pool.query('SELECT * FROM usuarios WHERE id = $1 AND token = $2', [
            decoded.id,
            token,
        ]);

        if (result.rows.length === 0) {
            return res.status(403).json({ error: 'Token inválido o expirado' });
        }

        req.user = { id: decoded.id, email: decoded.email };
        next();
    } catch (error) {
        console.error('Error en la autenticación:', error);
        res.status(403).json({ error: 'Token inválido o expirado' });
    }
};

module.exports = { authenticateUser };
