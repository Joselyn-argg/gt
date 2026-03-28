const pool = require('../config/db');

const classModel = {
  // Crear tabla de clases
  createTable: async () => {
    const query = `
      CREATE TABLE IF NOT EXISTS clases (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        nivel VARCHAR(50) NOT NULL,
        duracion DECIMAL(3,1) NOT NULL,
        precio INTEGER NOT NULL,
        cupos INTEGER NOT NULL,
        descripcion TEXT,
        imagen VARCHAR(255),
        categorias TEXT[],
        fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    try {
      await pool.query(query);
    } catch (error) {
      console.error('Error al crear tabla clases:', error);
    }
  },

  // Obtener todas las clases
  getAll: async () => {
    const query = 'SELECT * FROM clases ORDER BY id';
    try {
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  // Obtener una clase por ID
  getById: async (id) => {
    const query = 'SELECT * FROM clases WHERE id = $1';
    try {
      const result = await pool.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Crear una nueva clase
  create: async (claseData) => {
    const { nombre, nivel, duracion, precio, cupos, descripcion, imagen, categorias } = claseData;
    const query = `
      INSERT INTO clases (nombre, nivel, duracion, precio, cupos, descripcion, imagen, categorias)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
    `;
    const values = [nombre, nivel, duracion, precio, cupos, descripcion, imagen, categorias];
    
    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Actualizar una clase
  update: async (id, claseData) => {
    const { nombre, nivel, duracion, precio, cupos, descripcion, imagen, categorias } = claseData;
    const query = `
      UPDATE clases 
      SET nombre = $1, nivel = $2, duracion = $3, precio = $4, cupos = $5, 
          descripcion = $6, imagen = $7, categorias = $8
      WHERE id = $9
      RETURNING *;
    `;
    const values = [nombre, nivel, duracion, precio, cupos, descripcion, imagen, categorias, id];
    
    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Eliminar una clase
  delete: async (id) => {
    const query = 'DELETE FROM clases WHERE id = $1 RETURNING *';
    try {
      const result = await pool.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
};

module.exports = classModel;