const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db');
const bcrypt = require('bcryptjs');

// Importar modelos
const userModel = require('./models/userModel');
const classModel = require('./models/classModel');
const articleModel = require('./models/articleModel');

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const classRoutes = require('./routes/classRoutes');
const articleRoutes = require('./routes/articleRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas - TODAS deben ir DESPUÉS de los middlewares
app.use('/api/auth', authRoutes);
app.use('/api/clases', classRoutes);
app.use('/api/articulos', articleRoutes);
app.use('/api/usuarios', userRoutes); // 👈 Aquí debe estar (no arriba)

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ 
    message: 'API Escuela de Patinaje',
    endpoints: {
      auth: '/api/auth',
      clases: '/api/clases',
      articulos: '/api/articulos',
      usuarios: '/api/usuarios' // 👈 Agregado
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

// Middleware 404 (siempre al final)
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
    
    // Crear datos de ejemplo para clases y artículos
    await createSampleData();
    
  } catch (error) {
    console.error('Error al inicializar:', error);
  }
});

// Función para crear datos de ejemplo (clases y artículos)
async function createSampleData() {
  try {
    // Verificar si hay clases
    const clases = await classModel.getAll();
    
    if (clases.length === 0) {
      await classModel.create({
        nombre: "Iniciación al Slalom",
        nivel: "iniciante",
        duracion: 1.5,
        precio: 15000,
        cupos: 8,
        descripcion: "Aprende las bases del slalom, la disciplina que combina técnica y velocidad.",
        imagen: "https://images.unsplash.com/photo-1520031441872-265e4ff70366?w=400",
        categorias: ["slalom", "principiantes"]
      });
      
      await classModel.create({
        nombre: "Técnicas de Freno",
        nivel: "intermedio",
        duracion: 1,
        precio: 12000,
        cupos: 10,
        descripcion: "Domina diferentes técnicas de frenado para patinar con total seguridad.",
        imagen: "https://images.unsplash.com/photo-1563089145-599f8c5f5e3d?w=400",
        categorias: ["técnicas", "seguridad"]
      });
      
      console.log('✅ Clases de ejemplo creadas');
    }

    // Verificar si hay artículos
    const articulos = await articleModel.getAll();
    
    if (articulos.length === 0) {
      await articleModel.create({
        titulo: "Cómo elegir tus primeros patines",
        subtitulo: "Guía completa para principiantes",
        autor: "Profesora Campeona",
        contenido: "Elegir tus primeros patines puede ser abrumador...",
        imagen: "https://contents.mediadecathlon.com/p2351530/k$7806eb9e9966765e62cfd2a1adf093e1/1200x0/1.91cr1/default.jpg?format=auto",
        categoria: "Principiantes"
      });
      
      await articleModel.create({
        titulo: "Beneficios del patinaje en niños",
        subtitulo: "Desarrollo físico y emocional",
        autor: "Profesora Campeona",
        contenido: "El patinaje es una actividad completa...",
        imagen: "https://www.inercia.com/blog/wp-content/uploads/2012/02/patines-infantiles1.jpg",
        categoria: "Infantil"
      });
      
      console.log('✅ Artículos de ejemplo creados');
    }
  } catch (error) {
    console.error('Error al crear datos de ejemplo:', error);
  }
}