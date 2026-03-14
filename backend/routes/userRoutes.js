const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Todas las rutas de usuario requieren autenticación
router.use(verifyToken);

// Rutas para artículos guardados
router.get('/articulos-guardados', userController.getSavedArticles);
router.post('/articulos-guardados', userController.saveArticle);
router.delete('/articulos-guardados/:articleId', userController.removeSavedArticle);

module.exports = router;