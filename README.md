# Escuela de Patinaje - Frontend

Proyecto frontend para una escuela de patinaje, desarrollado con React, Tailwind CSS y Context API.

## 🚀 Características

- **Atomic Design**: Estructura de componentes organizada (átomos, moléculas, organismos)
- **React Router**: Navegación entre páginas
- **Context API**: Estado global (carrito de compras)
- **Tailwind CSS**: Estilos personalizados con paleta de colores propia
- **React Icons**: Iconografía moderna
- **React Hot Toast**: Alertas y notificaciones

## 📁 Estructura del Proyecto
src/
├── components/
│ ├── Atomic/
│ │ ├── Atoms/ # Componentes básicos (Button, Input)
│ │ ├── Molecules/ # Combinaciones de átomos (NavLink, ProductCard)
│ │ └── Organisms/ # Componentes complejos (Header, Footer)
│ ├── Layouts/ # Layouts reutilizables (MainLayout, AdminLayout)
│ └── Pages/ # Vistas principales
├── context/ # Context API (CartContext)
├── hooks/ # Custom hooks
├── services/ # Peticiones a API (preparado para Hito 3)
└── utils/ # Funciones auxiliares

## 🎨 Paleta de Colores
'primary': '#C5E0D9',        // Verde menta suave
'secondary': '#D9E5E0',       // Verde agua pálido
'accent': '#9F9AC7',          // Lila más intenso
'accent2': '#E0E8E5',         // Gris verdoso
'accent3': '#B8A2E6',         // Lavanda medio
'dark': '#3A5E55',           // Verde oscuro
'light': '#FFFFFF',          // Blanco puro
