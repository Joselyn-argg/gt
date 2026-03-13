const classModel = require('../models/classModel');

const classController = {
  // Obtener todas las clases
  getAll: async (req, res) => {
    try {
      const clases = await classModel.getAll();
      res.json(clases);
    } catch (error) {
      console.error('Error al obtener clases:', error);
      res.status(500).json({ error: 'Error al obtener clases' });
    }
  },

  // Obtener una clase por ID
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const clase = await classModel.getById(id);

      if (!clase) {
        return res.status(404).json({ error: 'Clase no encontrada' });
      }

      res.json(clase);
    } catch (error) {
      console.error('Error al obtener clase:', error);
      res.status(500).json({ error: 'Error al obtener clase' });
    }
  },

  // Crear una nueva clase (solo admin)
  create: async (req, res) => {
    try {
      const { nombre, nivel, duracion, precio, cupos, descripcion, imagen, categorias } = req.body;

      // Validaciones básicas
      if (!nombre || !nivel || !duracion || !precio || !cupos) {
        return res.status(400).json({ 
          error: 'Faltan campos obligatorios' 
        });
      }

      if (precio <= 0 || cupos <= 0) {
        return res.status(400).json({ 
          error: 'Precio y cupos deben ser mayores a 0' 
        });
      }

      const nuevaClase = await classModel.create({
        nombre, nivel, duracion, precio, cupos, descripcion, imagen, categorias
      });

      res.status(201).json({
        message: 'Clase creada exitosamente',
        clase: nuevaClase
      });

    } catch (error) {
      console.error('Error al crear clase:', error);
      res.status(500).json({ error: 'Error al crear clase' });
    }
  },

  // Actualizar una clase (solo admin)
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const claseData = req.body;

      // Verificar si existe
      const claseExistente = await classModel.getById(id);
      if (!claseExistente) {
        return res.status(404).json({ error: 'Clase no encontrada' });
      }

      const claseActualizada = await classModel.update(id, claseData);

      res.json({
        message: 'Clase actualizada exitosamente',
        clase: claseActualizada
      });

    } catch (error) {
      console.error('Error al actualizar clase:', error);
      res.status(500).json({ error: 'Error al actualizar clase' });
    }
  },

  // Eliminar una clase (solo admin)
  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const claseEliminada = await classModel.delete(id);

      if (!claseEliminada) {
        return res.status(404).json({ error: 'Clase no encontrada' });
      }

      res.json({
        message: 'Clase eliminada exitosamente',
        clase: claseEliminada
      });

    } catch (error) {
      console.error('Error al eliminar clase:', error);
      res.status(500).json({ error: 'Error al eliminar clase' });
    }
  }
};

module.exports = classController;