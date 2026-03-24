# Escuela de Patinaje 🛼

Aplicación full-stack para una escuela de patinaje con gestión de clases, artículos informativos y autenticación de usuarios.

## 🚀 Características

### Frontend (React)
- **Atomic Design**: Estructura de componentes organizada (átomos, moléculas, organismos)
- **React Router**: Navegación entre páginas
- **Context API**: Estado global y autenticación
- **Tailwind CSS**: Estilos responsivos con paleta personalizada
- **React Icons**: Iconografía moderna
- **React Hot Toast**: Sistema de notificaciones
- **Protección de rutas**: Rutas privadas para usuarios autenticados

### Backend (Node.js + Express)
- **Autenticación JWT**: Sistema de login y registro seguro
- **PostgreSQL**: Base de datos relacional
- **CORS**: Configuración para comunicación frontend-backend
- **Middleware de autenticación**: Protección de rutas sensibles
- **Validaciones**: Verificación de datos en forma y base de datos

### Base de Datos
- **Tabla usuarios**: Registro y autenticación
- **Tabla clases**: Gestión de clases de patinaje
- **Tabla articulos**: Artículos informativos y educativos
- **Tabla usuarios_articulos**: Relación para guardar artículos favoritos

## 📁 Estructura del Proyecto

```
proyecto/
├── frontend/                    # Aplicación React
│   ├── src/
│   │   ├── components/
│   │   │   ├── Atomic/         # Componentes reutilizables
│   │   │   ├── Layouts/        # Layouts principales
│   │   │   └── Pages/          # Páginas/vistas
│   │   ├── context/            # Context API
│   │   ├── services/           # Llamadas a API
│   │   └── App.jsx             # Componente raíz
│   ├── package.json
│   └── vite.config.js
│
├── backend/                     # Servidor Node.js
│   ├── controllers/            # Lógica de negocio
│   ├── routes/                 # Definición de rutas
│   ├── models/                 # Modelos de datos
│   ├── middlewares/            # Middleware (auth, validators)
│   ├── config/                 # Configuración (BD)
│   ├── server.js               # Entrada del servidor
│   └── package.json
│
├── database/                    # Scripts SQL
│   ├── DDL.sql                 # Definición de tablas y estructura
│   └── DML.sql                 # Datos de prueba e inserciones
│
└── README.md                   # Este archivo
```

## 🎨 Paleta de Colores

Tema de **Lavanda y Púrpura** elegante y moderno:

```
'primary': '#aeb0eb',       // Lavanda muy suave
'secondary': '#D8D0F0',     // Lavanda pálido
'accent': '#9B8BC2',        // Lavanda medio
'accent2': '#C2B3E6',       // Lavanda claro
'accent3': '#B0A1D9',       // Lavanda medio suave
'dark': '#5E4B7A',          // Púrpura oscuro
'light': '#FFFFFF'          // Blanco puro
```

**Tipografía:** Poppins (sans-serif)

## 🗄️ Base de Datos

### Crear la base de datos
1. Ejecutar `DDL.sql` para crear la estructura de tablas
2. Ejecutar `DML.sql` para insertar datos de prueba

```bash
# Desde una terminal PostgreSQL
\i database/DDL.sql
\i database/DML.sql
```

### Tablas principales
- **usuarios**: 400 caracteres máximo en contraseña (encriptada con bcrypt)
- **clases**: Información de clases de patinaje con cupos limitados
- **articulos**: Artículos informativos categorizados
- **usuarios_articulos**: Artículos guardados por cada usuario (relación M:M)

## 🛠️ Instalación

### Requisitos previos
- **Node.js** v16 o superior (recomendado v18+)
- **npm** v8 o superior (incluido con Node.js)
- **PostgreSQL** v12 o superior
- **Git** (para clonar el repositorio)

### Backend
```bash
cd backend
npm install

# Configurar archivo .env
# Crear archivo .env con:
PORT=3000
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/escuela_patinaje
JWT_SECRET=tu_clave_secreta_aqui

npm run dev
```

### Frontend
```bash
cd frontend
npm install

# Ejecutar en modo desarrollo (Vite)
npm run dev

# Compilar para producción
npm build
```

El servidor backend correrá en `http://localhost:3000`
El frontend correrá en `http://localhost:5173` (Vite con HMR)

## 🔐 Autenticación

### Sistema de Login
- **Email y contraseña**: Autenticación con JWT
- **Token JWT**: Se almacena en localStorage del navegador
- **Rutas protegidas**: Solo usuarios autenticados pueden acceder a ciertas funciones

### Usuarios de prueba
```
Email: admin@escuela.cl
Contraseña: admin123
Tipo: admin

Email: usuario@ejemplo.cl
Contraseña: usuario123
Tipo: usuario
```

## 🚀 Rutas principales

### Públicas
- `/` - Inicio
- `/clases` - Listado de clases
- `/clases/:id` - Detalle de clase
- `/informacion` - Artículos informativos
- `/informacion/:id` - Detalle de artículo
- `/login` - Página de login
- `/contacto` - Contacto

### Protegidas (requieren autenticación)
- `/perfil` - Perfil de usuario
- `/perfil/guardados` - Artículos guardados

### Admin (requieren rol admin)
- `/admin` - Panel de administración
- `/admin/clases` - Gestión de clases
- `/admin/informacion` - Gestión de artículos

## 🔌 API Endpoints

### Autenticación
```
POST   /api/auth/login          - Iniciar sesión
POST   /api/auth/register       - Registrarse
GET    /api/auth/verify         - Verificar token
```

### Clases
```
GET    /api/clases              - Obtener todas las clases
GET    /api/clases/:id          - Obtener una clase
POST   /api/clases              - Crear clase (admin)
PUT    /api/clases/:id          - Actualizar clase (admin)
DELETE /api/clases/:id          - Eliminar clase (admin)
```

### Artículos
```
GET    /api/articulos           - Obtener todos los artículos
GET    /api/articulos/:id       - Obtener un artículo
POST   /api/articulos           - Crear artículo (admin)
PUT    /api/articulos/:id       - Actualizar artículo (admin)
DELETE /api/articulos/:id       - Eliminar artículo (admin)
```

### Usuarios & Artículos Guardados
```
GET    /api/usuarios/articulos-guardados        - Obtener artículos guardados
POST   /api/usuarios/articulos-guardados        - Guardar artículo
DELETE /api/usuarios/articulos-guardados/:id    - Eliminar artículo guardado
```

## 📝 Variables de Entorno

### Backend (.env)
```
PORT=3000
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/escuela_patinaje
JWT_SECRET=tu_clave_secreta_muy_segura_aqui
NODE_ENV=development
```

## 📦 Dependencias principales

### Frontend
- react (^19.2.0)
- react-router-dom (^7.13.1)
- axios (^1.13.6)
- tailwindcss (^3.4.1)
- react-icons (^5.6.0)
- react-hot-toast (^2.6.0)
- vite (^7.3.1)

### Backend
- express (^5.2.1)
- postgresql/pg (^8.20.0)
- jsonwebtoken (^9.0.3)
- bcryptjs (^3.0.3)
- cors (^2.8.6)
- dotenv (^17.3.1)
- nodemon (^3.1.14) - dev

## ✨ Características especiales

### Artículos guardados
- Los usuarios autenticados pueden guardar artículos favoritos
- Mensaje de error personalizado para usuarios no autenticados
- Redirección automática a login después de 2.5 segundos

### Panel de administración
- Crear, editar y eliminar clases
- Crear, editar y eliminar artículos
- Acceso restringido solo para usuarios con rol "admin"

### Validaciones
- Validación de email en login y registro
- Verificación de contraseña con bcrypt
- Protección de rutas con JWT

## 🐛 Solución de problemas

### Error: "no existe la relación usuarios_articulos"
- Asegúrate de ejecutar DDL.sql primero
- Luego ejecuta DML.sql
- Reinicia el servidor backend

### Error de autenticación (401)
- Verifica que el token JWT esté en localStorage
- Asegúrate de que el token no esté expirado
- Intenta hacer login nuevamente

### Problemas de conexión a BD
- Verifica que PostgreSQL esté ejecutándose
- Comprueba las credenciales en el archivo .env
- Asegúrate de que la base de datos existe

## 📄 Licencia

Proyecto educativo - Escuela de Patinaje

## 👨‍💻 Autor

Desarrollo de aplicación full-stack para gestión de escuela de patinaje hecho por Joselyn Vaneska Silva Villarroel
