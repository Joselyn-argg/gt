import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Breadcrumbs from '../Atomic/Molecules/Breadcrumbs';
import Button from '../Atomic/Atoms/Button';
import Input from '../Atomic/Atoms/Input';
import { toast } from 'react-hot-toast';
import api from '../../services/api';

const LoginPage = () => {
  const navigate = useNavigate();
  
  // Verificar si ya hay sesión activa al cargar la página
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (token && user) {
      // Si ya hay sesión, redirigir según el tipo de usuario
      if (user.tipo_usuario === 'admin') {
        navigate('/admin');
      } else {
        navigate('/perfil');
      }
    }
  }, [navigate]);

  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const [registerEmail, setRegisterEmail] = useState('');

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await api.post('/auth/login', {
        email: loginData.username,
        password: loginData.password
      });
      
      // Guardar token y datos del usuario
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      toast.success('¡Sesión iniciada correctamente!');
      
      // Redirigir según tipo de usuario
      if (response.data.user.tipo_usuario === 'admin') {
        navigate('/admin');
      } else {
        navigate('/perfil');
      }
      
    } catch (error) {
      console.error('Error login:', error);
      toast.error('Credenciales inválidas');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    try {
      // Aquí iría la llamada real al backend para registrar
      toast.success('Se ha enviado un enlace a tu correo electrónico');
      setRegisterEmail('');
    } catch (error) {
      toast.error('Error al registrar');
    }
  };

  return (
    <div>
      <Breadcrumbs />
      
      <h1 className="text-3xl font-bold text-dark mb-8 text-center">Mi Cuenta</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Columna izquierda - Iniciar Sesión */}
        <div className="bg-light rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-dark mb-6">Acceder</h2>
          
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-dark mb-2">
                Correo electrónico
              </label>
              <Input
                type="text"
                id="username"
                name="username"
                value={loginData.username}
                onChange={handleLoginChange}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-dark mb-2">
                Contraseña
              </label>
              <Input
                type="password"
                id="password"
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
                required
              />
            </div>

            <Button type="submit" variant="primary" className="w-full mb-4">
              Acceder
            </Button>

            <div className="flex items-center justify-between">
              <Link to="/recuperar-password" className="text-sm text-primary hover:underline">
                ¿Olvidaste la contraseña?
              </Link>
            </div>
          </form>
        </div>

        {/* Columna derecha - Registrarse */}
        <div className="bg-light rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-dark mb-6">Registrarse</h2>
          
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label htmlFor="register-email" className="block text-sm font-medium text-dark mb-2">
                Correo electrónico
              </label>
              <Input
                type="email"
                id="register-email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                required
              />
            </div>

            <p className="text-sm text-gray-600 mb-4">
              Se enviará un enlace a tu correo electrónico para establecer tu contraseña.
            </p>

            <Button type="submit" variant="accent" className="w-full">
              Registrarse
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;