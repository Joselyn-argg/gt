const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

// Rutas públicas
router.get('/', classController.getAll);
router.get('/:id', classController.getById);

// Rutas protegidas (solo admin)
router.post('/', verifyToken, isAdmin, classController.create);
router.put('/:id', verifyToken, isAdmin, classController.update);
router.delete('/:id', verifyToken, isAdmin, classController.delete);

module.exports = router;