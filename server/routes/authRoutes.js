import express from 'express';
import { login, verifySession, logout } from '../controllers/authController.js';
import { authenticateUser } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/login', login); // Iniciar sesión
router.get('/verify', authenticateUser, verifySession); // Verificar sesión con JWT
router.post('/logout', authenticateUser, logout); // Cerrar sesión

export default router;
