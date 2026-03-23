import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../Atomic/Molecules/Breadcrumbs';
import Button from '../Atomic/Atoms/Button';
import Input from '../Atomic/Atoms/Input';
import AdminLayout from '../Layouts/AdminLayout';

const AdminProfilePage = () => {
  const navigate = useNavigate();
  
  const [userData, setUserData] = useState({
    nombre: 'Admin',
    apellido: 'Principal',
    email: 'admin@escuela.cl',
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

  return (
    <div>
      <Breadcrumbs />
      
      <AdminLayout activeTab="perfil">
        <div className="bg-light rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-dark mb-4">Información Personal</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-dark mb-2">Nombre</label>
              <Input name="nombre" value={userData.nombre} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-2">Apellido</label>
              <Input name="apellido" value={userData.apellido} onChange={handleChange} />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-dark mb-2">Correo Electrónico</label>
            <Input type="email" name="email" value={userData.email} onChange={handleChange} />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-dark mb-2">Contraseña Actual</label>
            <Input type="password" name="password" value={userData.password} onChange={handleChange} placeholder="Ingresa tu contraseña actual" />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-dark mb-2">Nueva Contraseña</label>
            <Input type="password" name="nuevaPassword" value={userData.nuevaPassword} onChange={handleChange} placeholder="Ingresa tu nueva contraseña" />
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSave} variant="primary">Guardar Cambios</Button>
          </div>
        </div>
      </AdminLayout>
    </div>
  );
};

export default AdminProfilePage;