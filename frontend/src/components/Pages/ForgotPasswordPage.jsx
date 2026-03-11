import { useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../Atomic/Molecules/Breadcrumbs';
import Button from '../Atomic/Atoms/Button';
import Input from '../Atomic/Atoms/Input';
import { toast } from 'react-hot-toast';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Se ha enviado un enlace a tu correo electrónico para restablecer tu contraseña');
    setEmail('');
  };

  return (
    <div>
      <Breadcrumbs />
      
      <div className="max-w-md mx-auto">
        <div className="bg-light rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-dark mb-6">¿Olvidaste tu contraseña?</h1>
          
          <p className="text-gray-600 mb-4">
            Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-dark mb-2">
                Correo electrónico
              </label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <Button type="submit" variant="primary" className="w-full mb-4">
              Enviar enlace
            </Button>

            <Link to="/login" className="text-sm text-primary hover:underline block text-center">
              Volver a iniciar sesión
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;