const articleModel = require('../models/articleModel');

const articleController = {
  // Obtener todos los artículos
  getAll: async (req, res) => {
    try {
      const articulos = await articleModel.getAll();
      res.json(articulos);
    } catch (error) {
      console.error('Error al obtener artículos:', error);
      res.status(500).json({ error: 'Error al obtener artículos' });
    }
  },

  // Obtener un artículo por ID
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const articulo = await articleModel.getById(id);

      if (!articulo) {
        return res.status(404).json({ error: 'Artículo no encontrado' });
      }

      res.json(articulo);
    } catch (error) {
      console.error('Error al obtener artículo:', error);
      res.status(500).json({ error: 'Error al obtener artículo' });
    }
  },

  // Crear un nuevo artículo (solo admin)
  create: async (req, res) => {
    try {
      const { titulo, subtitulo, autor, contenido, imagen, categoria } = req.body;

      if (!titulo || !autor || !contenido) {
        return res.status(400).json({ 
          error: 'Título, autor y contenido son obligatorios' 
        });
      }

      const nuevoArticulo = await articleModel.create({
        titulo, subtitulo, autor, contenido, imagen, categoria
      });

      res.status(201).json({
        message: 'Artículo creado exitosamente',
        articulo: nuevoArticulo
      });

    } catch (error) {
      console.error('Error al crear artículo:', error);
      res.status(500).json({ error: 'Error al crear artículo' });
    }
  },

  // Actualizar un artículo (solo admin)
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const articuloData = req.body;

      const articuloExistente = await articleModel.getById(id);
      if (!articuloExistente) {
        return res.status(404).json({ error: 'Artículo no encontrado' });
      }

      const articuloActualizado = await articleModel.update(id, articuloData);

      res.json({
        message: 'Artículo actualizado exitosamente',
        articulo: articuloActualizado
      });

    } catch (error) {
      console.error('Error al actualizar artículo:', error);
      res.status(500).json({ error: 'Error al actualizar artículo' });
    }
  },

  // Eliminar un artículo (solo admin)
  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const articuloEliminado = await articleModel.delete(id);

      if (!articuloEliminado) {
        return res.status(404).json({ error: 'Artículo no encontrado' });
      }

      res.json({
        message: 'Artículo eliminado exitosamente',
        articulo: articuloEliminado
      });

    } catch (error) {
      console.error('Error al eliminar artículo:', error);
      res.status(500).json({ error: 'Error al eliminar artículo' });
    }
  }
};

module.exports = articleController;