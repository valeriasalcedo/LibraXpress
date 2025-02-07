import { verifyToken } from '../utils/jwtUtils.js';

/**
 * Middleware para proteger rutas autenticadas.
 */
export const authenticateUser = (req, res, next) => {
    const authHeader = req.headers.authorization; // Obtener el header Authorization

    if (!authHeader) {
        return res.status(401).json({ error: 'Acceso denegado. No hay token.' });
    }

    const token = authHeader.split(' ')[1]; // Extraer el token

    const userData = verifyToken(token);
    
    if (!userData) {
        return res.status(403).json({ error: 'Token inválido o expirado.' });
    }

    req.user = userData; // Agregar los datos del usuario a la solicitud
    next();
};
