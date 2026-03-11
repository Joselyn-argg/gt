import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../Atomic/Molecules/Breadcrumbs';
import Button from '../Atomic/Atoms/Button';
import AdminLayout from '../Layouts/AdminLayout';
import { FaEdit, FaTrash, FaEye, FaPlus } from 'react-icons/fa';

const AdminClassesPage = () => {
  const navigate = useNavigate();
  
  // Datos simulados de clases
  const [clases, setClases] = useState([
    { 
      id: 1, 
      nombre: "Iniciación al Slalom", 
      nivel: "iniciante", 
      precio: 15000,
      duracion: "1.5 horas",
      cupos: 8
    },
    { 
      id: 2, 
      nombre: "Técnicas de Freno", 
      nivel: "intermedio", 
      precio: 12000,
      duracion: "1 hora",
      cupos: 10
    }
  ]);

  const handleView = (id) => {
    navigate(`/clases/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/admin/clases/detail/${id}`);
  };

  const handleDelete = (id) => {
    if (confirm('¿Estás seguro de eliminar esta clase?')) {
      setClases(clases.filter(c => c.id !== id));
    }
  };

  const handleAddNew = () => {
    navigate('/admin/clases/detail');
  };

  return (
    <div>
      <Breadcrumbs />
      
      <AdminLayout activeTab="clases">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-dark">Administrar Clases</h1>
          <Button onClick={handleAddNew} variant="primary" className="flex items-center gap-2">
            <FaPlus /> Añadir Clase
          </Button>
        </div>

        <div className="bg-light rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-dark mb-4">Lista de Clases</h2>

          <div className="space-y-3">
            {clases.map(clase => (
              <div key={clase.id} className="flex justify-between items-center p-4 bg-secondary bg-opacity-20 rounded-lg">
                <div>
                  <h3 className="font-semibold text-dark text-lg">{clase.nombre}</h3>
                  <div className="flex gap-4 mt-1 text-sm text-gray-600">
                    <span>Nivel: {clase.nivel}</span>
                    <span>Duración: {clase.duracion}</span>
                    <span>Precio: ${clase.precio}</span>
                    <span>Cupos: {clase.cupos}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleView(clase.id)}
                    className="p-2 text-primary hover:bg-primary hover:text-white rounded transition-colors"
                    title="Ver"
                  >
                    <FaEye />
                  </button>
                  <button 
                    onClick={() => handleEdit(clase.id)}
                    className="p-2 text-accent hover:bg-accent hover:text-white rounded transition-colors"
                    title="Editar"
                  >
                    <FaEdit />
                  </button>
                  <button 
                    onClick={() => handleDelete(clase.id)}
                    className="p-2 text-gray-600 hover:bg-red-500 hover:text-white rounded transition-colors"
                    title="Eliminar"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AdminLayout>
    </div>
  );
};

export default AdminClassesPage;