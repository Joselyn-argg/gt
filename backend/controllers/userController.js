const pool = require('../config/db');

const userController = {
  // Guardar artículo
  saveArticle: async (req, res) => {
    try {
      const userId = req.user.id;
      const { articleId } = req.body;
      
      // Verificar si ya está guardado
      const existing = await pool.query(
        'SELECT * FROM usuarios_articulos WHERE usuario_id = $1 AND articulo_id = $2',
        [userId, articleId]
      );
      
      if (existing.rows.length > 0) {
        return res.status(400).json({ error: 'Artículo ya guardado' });
      }
      
      await pool.query(
        'INSERT INTO usuarios_articulos (usuario_id, articulo_id) VALUES ($1, $2)',
        [userId, articleId]
      );
      
      res.json({ message: 'Artículo guardado', articleId });
    } catch (error) {
      console.error('Error al guardar artículo:', error);
      res.status(500).json({ error: 'Error al guardar artículo' });
    }
  },

  // Obtener artículos guardados del usuario
  getSavedArticles: async (req, res) => {
    try {
      const userId = req.user.id;
      
      const result = await pool.query(
        `SELECT a.* FROM articulos a
         INNER JOIN usuarios_articulos ua ON a.id = ua.articulo_id
         WHERE ua.usuario_id = $1
         ORDER BY ua.fecha_guardado DESC`,
        [userId]
      );
      
      res.json(result.rows);
    } catch (error) {
      console.error('Error al obtener artículos guardados:', error);
      res.status(500).json({ error: 'Error al obtener artículos guardados' });
    }
  },

  // Eliminar artículo guardado
  removeSavedArticle: async (req, res) => {
    try {
      const userId = req.user.id;
      const { articleId } = req.params;
      
      const result = await pool.query(
        'DELETE FROM usuarios_articulos WHERE usuario_id = $1 AND articulo_id = $2 RETURNING *',
        [userId, articleId]
      );
      
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Artículo no encontrado en guardados' });
      }
      
      res.json({ message: 'Artículo eliminado de guardados', articleId });
    } catch (error) {
      console.error('Error al eliminar artículo guardado:', error);
      res.status(500).json({ error: 'Error al eliminar artículo guardado' });
    }
  }
};

module.exports = userController;