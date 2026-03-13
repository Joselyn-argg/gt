const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db');
const bcrypt = require('bcryptjs'); // 👈 IMPORTANTE: agregar esta línea

// Importar modelos
const userModel = require('./models/userModel');
const classModel = require('./models/classModel');
const articleModel = require('./models/articleModel');

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const classRoutes = require('./routes/classRoutes');
const articleRoutes = require('./routes/articleRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/clases', classRoutes);
app.use('/api/articulos', articleRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ 
    message: 'API Escuela de Patinaje',
    endpoints: {
      auth: '/api/auth',
      clases: '/api/clases',
      articulos: '/api/articulos'
    }
  });
});

// Ruta test-db
app.get('/test-db', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW()');
    res.json({ 
      success: true,
      message: 'Conexión a BD exitosa', 
      time: result.rows[0] 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Middleware 404
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Función para crear usuarios de ejemplo
async function createSampleUsers() {
  try {
    // Verificar si ya existen
    const adminExists = await userModel.findByEmail('admin@escuela.cl');
    const userExists = await userModel.findByEmail('usuario@ejemplo.cl');

    // Crear usuario ADMIN si no existe
    if (!adminExists) {
      // Encriptar contraseña manualmente
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      
      // Insertar directamente con SQL
      await db.query(
        `INSERT INTO usuarios (nombre, apellido, email, password, tipo_usuario) 
         VALUES ($1, $2, $3, $4, $5)`,
        ['Admin', 'Principal', 'admin@escuela.cl', hashedPassword, 'admin']
      );
      console.log('✅ Usuario ADMIN creado: admin@escuela.cl / admin123');
    }

    // Crear usuario NORMAL si no existe
    if (!userExists) {
      // Encriptar contraseña manualmente
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('usuario123', salt);
      
      // Insertar directamente con SQL
      await db.query(
        `INSERT INTO usuarios (nombre, apellido, email, password, tipo_usuario) 
         VALUES ($1, $2, $3, $4, $5)`,
        ['Usuario', 'Normal', 'usuario@ejemplo.cl', hashedPassword, 'usuario']
      );
      console.log('✅ Usuario NORMAL creado: usuario@ejemplo.cl / usuario123');
    }

  } catch (error) {
    console.error('Error al crear usuarios de ejemplo:', error);
  }
}

// Iniciar servidor y crear tablas
app.listen(PORT, async () => {
  console.log(`🚀 Servidor en http://localhost:${PORT}`);
  
  try {
    // Crear tablas si no existen
    await userModel.createTable();
    await classModel.createTable();
    await articleModel.createTable();
    console.log('✅ Tablas creadas/verificadas');
    
    // Crear usuarios de ejemplo
    await createSampleUsers();
    
  } catch (error) {
    console.error('Error al inicializar:', error);
  }
});