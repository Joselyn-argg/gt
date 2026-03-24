const pool = require('../config/db');

const userArticlesModel = {
  // Crear tabla de relación usuarios-artículos
  createTable: async () => {
    const query = `
      CREATE TABLE IF NOT EXISTS usuarios_articulos (
        id SERIAL PRIMARY KEY,
        usuario_id INTEGER NOT NULL,
        articulo_id INTEGER NOT NULL,
        fecha_guardado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
        FOREIGN KEY (articulo_id) REFERENCES articulos(id) ON DELETE CASCADE,
        UNIQUE(usuario_id, articulo_id)
      );
    `;
    try {
      await pool.query(query);
      console.log('✅ Tabla "usuarios_articulos" creada/verificada');
    } catch (error) {
      console.error('Error al crear tabla usuarios_articulos:', error);
    }
  }
};

module.exports = userArticlesModel;
