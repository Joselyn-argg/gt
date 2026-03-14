const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Rutas públicas
router.post('/register', authController.register);
router.post('/login', authController.login);

// Ruta protegida para verificar token
router.get('/verify', verifyToken, authController.verifyToken);

module.exports = router;