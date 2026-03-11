import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Breadcrumbs from '../Atomic/Molecules/Breadcrumbs';
import Button from '../Atomic/Atoms/Button';
import Input from '../Atomic/Atoms/Input';
import { FaUserCircle, FaSignOutAlt, FaBookmark } from 'react-icons/fa';

const UserProfilePage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    nombre: 'Joselyn',
    apellido: 'Silva',
    email: 'joselyn@email.com',
    password: '',
    nuevaPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    alert('Cambios guardados exitosamente');
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div>
      <Breadcrumbs />
      
      <h1 className="text-3xl font-bold text-dark mb-6">Mi Perfil</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Menú lateral */}
        <div className="md:col-span-1">
          <div className="bg-light rounded-lg shadow-lg p-6">
            <div className="flex flex-col items-center mb-6">
              <FaUserCircle className="text-6xl text-primary mb-2" />
              <p className="font-semibold text-dark">{userData.nombre} {userData.apellido}</p>
              <p className="text-sm text-gray-600">{userData.email}</p>
            </div>

            <nav className="space-y-2">
              <Link to="/perfil" className="block p-2 bg-primary text-white rounded font-medium">
                Mi Perfil
              </Link>
              <Link to="/perfil/guardados" className="block p-2 hover:bg-secondary hover:bg-opacity-50 rounded font-medium">
                Información guardada
              </Link>
            </nav>

            <div className="mt-6 pt-4 border-t">
              <Button onClick={handleLogout} variant="warning" className="w-full flex items-center justify-center gap-2">
                <FaSignOutAlt /> Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>

        {/* Formulario de perfil */}
        <div className="md:col-span-3">
          <div className="bg-light rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-dark mb-4">Información Personal</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-dark mb-2">Nombre</label>
                <Input
                  name="nombre"
                  value={userData.nombre}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-2">Apellido</label>
                <Input
                  name="apellido"
                  value={userData.apellido}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-dark mb-2">Correo Electrónico</label>
              <Input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-dark mb-2">Contraseña Actual</label>
              <Input
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                placeholder="Ingresa tu contraseña actual"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-dark mb-2">Nueva Contraseña</label>
              <Input
                type="password"
                name="nuevaPassword"
                value={userData.nuevaPassword}
                onChange={handleChange}
                placeholder="Ingresa tu nueva contraseña"
              />
            </div>

            <div className="flex justify-end">
              <Button onClick={handleSave} variant="primary">
                Guardar Cambios
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;