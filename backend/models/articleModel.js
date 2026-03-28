const pool = require('../config/db');

const articleModel = {
  // Crear tabla de artículos
  createTable: async () => {
    const query = `
      CREATE TABLE IF NOT EXISTS articulos (
        id SERIAL PRIMARY KEY,
        titulo VARCHAR(200) NOT NULL,
        subtitulo VARCHAR(200),
        autor VARCHAR(100) NOT NULL,
        contenido TEXT NOT NULL,
        imagen VARCHAR(255),
        categoria VARCHAR(50),
        fecha_publicacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    try {
      await pool.query(query);
    } catch (error) {
      console.error('Error al crear tabla articulos:', error);
    }
  },

  // Obtener todos los artículos
  getAll: async () => {
    const query = 'SELECT * FROM articulos ORDER BY fecha_publicacion DESC';
    try {
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  // Obtener un artículo por ID
  getById: async (id) => {
    const query = 'SELECT * FROM articulos WHERE id = $1';
    try {
      const result = await pool.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Crear un nuevo artículo
  create: async (articuloData) => {
    const { titulo, subtitulo, autor, contenido, imagen, categoria } = articuloData;
    const query = `
      INSERT INTO articulos (titulo, subtitulo, autor, contenido, imagen, categoria)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [titulo, subtitulo, autor, contenido, imagen, categoria];
    
    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Actualizar un artículo
  update: async (id, articuloData) => {
    const { titulo, subtitulo, autor, contenido, imagen, categoria } = articuloData;
    const query = `
      UPDATE articulos 
      SET titulo = $1, subtitulo = $2, autor = $3, contenido = $4, 
          imagen = $5, categoria = $6
      WHERE id = $7
      RETURNING *;
    `;
    const values = [titulo, subtitulo, autor, contenido, imagen, categoria, id];
    
    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Eliminar un artículo
  delete: async (id) => {
    const query = 'DELETE FROM articulos WHERE id = $1 RETURNING *';
    try {
      const result = await pool.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
};

module.exports = articleModel;