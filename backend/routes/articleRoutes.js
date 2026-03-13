const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

// Rutas públicas
router.get('/', articleController.getAll);
router.get('/:id', articleController.getById);

// Rutas protegidas (solo admin)
router.post('/', verifyToken, isAdmin, articleController.create);
router.put('/:id', verifyToken, isAdmin, articleController.update);
router.delete('/:id', verifyToken, isAdmin, articleController.delete);

module.exports = router;