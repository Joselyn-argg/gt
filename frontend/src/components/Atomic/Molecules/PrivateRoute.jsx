import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import api from '../../../services/api';

const PrivateRoute = ({ children, adminOnly = false }) => {
  const [isVerifying, setIsVerifying] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      
      // Si no hay token, directamente inválido
      if (!token) {
        setIsValid(false);
        setIsVerifying(false);
        return;
      }

      try {
        // Verificar el token con el backend
        const response = await api.get('/auth/verify');
        
        if (response.data.valid) {
          setIsValid(true);
          setUser(response.data.user);
          // Actualizar el usuario en localStorage por si cambió
          localStorage.setItem('user', JSON.stringify(response.data.user));
        } else {
          // Token inválido, limpiar localStorage
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setIsValid(false);
        }
      } catch (error) {
        console.error('Error al verificar token:', error);
        // Token inválido o expirado
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsValid(false);
      } finally {
        setIsVerifying(false);
      }
    };

    verifyToken();
  }, []);

  // Mientras verifica, mostrar loading
  if (isVerifying) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando sesión...</p>
        </div>
      </div>
    );
  }

  // Si no es válido, redirigir al login
  if (!isValid) {
    return <Navigate to="/login" />;
  }

  // Si es ruta solo para admin y el usuario no es admin, redirigir al perfil normal
  if (adminOnly && user?.tipo_usuario !== 'admin') {
    return <Navigate to="/perfil" />;
  }

  // Todo bien, mostrar el componente
  return children;
};

export default PrivateRoute;