const pool = require('../config/db');
const bcrypt = require('bcryptjs');

// Modelo de Usuario - contiene todas las consultas SQL
const userModel = {
  // Crear tabla de usuarios si no existe
  createTable: async () => {
    const query = `
      CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        apellido VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        tipo_usuario VARCHAR(20) DEFAULT 'usuario',
        fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    try {
      await pool.query(query);
      console.log('✅ Tabla "usuarios" creada/verificada');
    } catch (error) {
      console.error('Error al crear tabla usuarios:', error);
    }
  },

  // Crear un nuevo usuario
  create: async (nombre, apellido, email, password, tipo_usuario = 'usuario') => {
    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const query = `
      INSERT INTO usuarios (nombre, apellido, email, password, tipo_usuario)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, nombre, apellido, email, tipo_usuario;
    `;
    const values = [nombre, apellido, email, hashedPassword, tipo_usuario];
    
    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Buscar usuario por email (para login)
  findByEmail: async (email) => {
    const query = 'SELECT * FROM usuarios WHERE email = $1';
    try {
      const result = await pool.query(query, [email]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Buscar usuario por ID
  findById: async (id) => {
    const query = 'SELECT id, nombre, apellido, email, tipo_usuario FROM usuarios WHERE id = $1';
    try {
      const result = await pool.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Verificar contraseña (para login)
  comparePassword: async (candidatePassword, hashedPassword) => {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }
};

module.exports = userModel;