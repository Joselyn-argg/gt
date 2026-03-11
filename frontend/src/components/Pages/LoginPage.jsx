import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Breadcrumbs from '../Atomic/Molecules/Breadcrumbs';
import Button from '../Atomic/Atoms/Button';
import Input from '../Atomic/Atoms/Input';
import { toast } from 'react-hot-toast';

const LoginPage = () => {
  const navigate = useNavigate();
  
  // Estado para formulario de login
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  // Estado para formulario de registro
  const [registerEmail, setRegisterEmail] = useState('');

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Simular login exitoso
    toast.success('¡Bienvenido!');
    navigate('/perfil');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // Simular registro
    toast.success('Se ha enviado un enlace a tu correo electrónico para establecer tu contraseña');
    setRegisterEmail('');
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
                Nombre de usuario o correo electrónico
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
              Acceso
            </Button>

            <div className="flex items-center mb-4">
              <input type="checkbox" id="remember" className="mr-2" />
              <label htmlFor="remember" className="text-sm text-gray-700">
                Recuérdame
              </label>
            </div>

            <Link to="/recuperar-password" className="text-sm text-primary hover:underline">
              ¿Olvidaste la contraseña?
            </Link>
          </form>
        </div>

        {/* Columna derecha - Registrarse */}
        <div className="bg-light rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-dark mb-6">Registrarse</h2>
          
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label htmlFor="register-email" className="block text-sm font-medium text-dark mb-2">
                Dirección de correo electrónico
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
              Se enviará un enlace a tu dirección de correo electrónico para establecer una nueva contraseña.
            </p>

            <p className="text-xs text-gray-500 mb-4">
              Tus datos personales se utilizarán para procesar tu pedido, mejorar tu experiencia en esta web, 
              gestionar el acceso a tu cuenta y otros propósitos descritos en nuestra{' '}
              <Link to="/privacidad" className="text-primary hover:underline">
                política de privacidad
              </Link>.
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