import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { CartProvider } from './context/CartContext';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* CartProvider envuelve a toda la app para que el carrito sea global */}
    <CartProvider>
      <App />
      <Toaster position="bottom-right" reverseOrder={false} /> {/* Componente que muestra las alertas */}
    </CartProvider>
  </React.StrictMode>
);