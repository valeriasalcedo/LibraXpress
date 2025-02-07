import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'super_secret_key';

/**
 * Genera un JWT con los datos del usuario.
 * @param {Object} user - Datos del usuario.
 * @returns {string} Token JWT.
 */
export const generateToken = (user) => {
    return jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
        expiresIn: '1h', // Expira en 1 hora
    });
};

/**
 * Verifica un JWT y devuelve los datos del usuario si es válido.
 * @param {string} token - Token JWT recibido.
 * @returns {Object | null} Datos del usuario si es válido, null si es inválido.
 */
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        return null; // Token inválido o expirado
    }
};
