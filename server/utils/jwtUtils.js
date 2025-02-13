const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Genera un token JWT.
 * @param {Object} user - Datos del usuario.
 * @returns {string} Token JWT.
 */
const generateToken = (user) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET no está definido en el archivo .env');
    }
    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
};

module.exports = { generateToken };
