-- =============================================
-- DDL (Data Definition Language)
-- Definición de la estructura de la base de datos
-- =============================================

-- =============================================
-- TABLA: usuarios
-- Descripción: Almacena la información de los usuarios registrados
-- =============================================
CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  tipo_usuario VARCHAR(20) DEFAULT 'usuario',
  fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- TABLA: clases
-- Descripción: Almacena información de las clases de patinaje disponibles
-- =============================================
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

-- =============================================
-- TABLA: articulos
-- Descripción: Almacena artículos informativos y educativos
-- =============================================
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

-- =============================================
-- TABLA: usuarios_articulos
-- Descripción: Relación muchos-a-muchos entre usuarios y artículos guardados
-- =============================================
CREATE TABLE IF NOT EXISTS usuarios_articulos (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER NOT NULL,
  articulo_id INTEGER NOT NULL,
  fecha_guardado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  FOREIGN KEY (articulo_id) REFERENCES articulos(id) ON DELETE CASCADE,
  UNIQUE(usuario_id, articulo_id)
);

-- =============================================
-- ÍNDICES
-- Mejora el rendimiento de consultas frecuentes
-- =============================================
CREATE INDEX IF NOT EXISTS idx_usuarios_email ON usuarios(email);
CREATE INDEX IF NOT EXISTS idx_clases_nivel ON clases(nivel);
CREATE INDEX IF NOT EXISTS idx_articulos_categoria ON articulos(categoria);
CREATE INDEX IF NOT EXISTS idx_usuarios_articulos_usuario_id ON usuarios_articulos(usuario_id);
CREATE INDEX IF NOT EXISTS idx_usuarios_articulos_articulo_id ON usuarios_articulos(articulo_id);
