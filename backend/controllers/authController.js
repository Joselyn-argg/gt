const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authController = {
  // Registrar un nuevo usuario
  register: async (req, res) => {
    try {
      const { nombre, apellido, email, password } = req.body;

      // Validar campos obligatorios
      if (!nombre || !apellido || !email || !password) {
        return res.status(400).json({ 
          error: 'Todos los campos son obligatorios' 
        });
      }

      // Verificar si el usuario ya existe
      const existingUser = await userModel.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ 
          error: 'El email ya está registrado' 
        });
      }

      // Crear usuario (por defecto es 'usuario' normal)
      const newUser = await userModel.create(nombre, apellido, email, password);

      // Generar token JWT
      const token = jwt.sign(
        { 
          id: newUser.id, 
          email: newUser.email, 
          tipo_usuario: newUser.tipo_usuario 
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      res.status(201).json({
        message: 'Usuario registrado exitosamente',
        token,
        user: newUser
      });

    } catch (error) {
      console.error('Error en registro:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  // Iniciar sesión
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Validar campos
      if (!email || !password) {
        return res.status(400).json({ 
          error: 'Email y contraseña son obligatorios' 
        });
      }

      // Buscar usuario por email
      const user = await userModel.findByEmail(email);
      if (!user) {
        return res.status(401).json({ 
          error: 'Credenciales inválidas' 
        });
      }

      // Verificar contraseña
      const isValidPassword = await userModel.comparePassword(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ 
          error: 'Credenciales inválidas' 
        });
      }

      // Generar token
      const token = jwt.sign(
        { 
          id: user.id, 
          email: user.email, 
          tipo_usuario: user.tipo_usuario 
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      // No enviar la contraseña en la respuesta
      const { password: _, ...userWithoutPassword } = user;

      res.json({
        message: 'Login exitoso',
        token,
        user: userWithoutPassword
      });

    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  verifyToken: async (req, res) => {
    try {
      // El token ya fue verificado por el middleware
      // Buscar usuario actualizado en la BD
      const user = await userModel.findById(req.user.id);
      
      if (!user) {
        return res.status(401).json({ 
          valid: false,
          error: 'Usuario no encontrado' 
        });
      }

      res.json({
        valid: true,
        user: {
          id: user.id,
          nombre: user.nombre,
          apellido: user.apellido,
          email: user.email,
          tipo_usuario: user.tipo_usuario
        }
      });
    } catch (error) {
      console.error('Error al verificar token:', error);
      res.status(500).json({ 
        valid: false,
        error: 'Error al verificar token' 
      });
    }
  }
};

module.exports = authController;