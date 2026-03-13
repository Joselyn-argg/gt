const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware para verificar token JWT
const verifyToken = (req, res, next) => {
  // Obtener token del header
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ 
      error: 'Acceso no autorizado. Token no proporcionado.' 
    });
  }

  // Extraer el token (formato: "Bearer token123")
  const token = authHeader.split(' ')[1];

  try {
    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Agregar info del usuario al request
    req.user = decoded;
    
    // Continuar con la siguiente función
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expirado' });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Token inválido' });
    }
    return res.status(500).json({ error: 'Error al verificar token' });
  }
};

// Middleware para verificar si es administrador
const isAdmin = (req, res, next) => {
  // req.user debe venir del middleware verifyToken
  if (!req.user) {
    return res.status(401).json({ error: 'Usuario no autenticado' });
  }

  if (req.user.tipo_usuario !== 'admin') {
    return res.status(403).json({ 
      error: 'Acceso prohibido. Se requieren permisos de administrador.' 
    });
  }

  next();
};

module.exports = { verifyToken, isAdmin };