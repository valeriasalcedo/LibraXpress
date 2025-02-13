const express = require('express');
const { register, login, logout } = require('../controllers/authControllers');
const { authenticateUser } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/registro', register);
router.post('/acceso', login);
router.post('/salir', authenticateUser, logout);

module.exports = router;
