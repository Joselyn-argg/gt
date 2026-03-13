import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../Atomic/Molecules/Breadcrumbs';
import Button from '../Atomic/Atoms/Button';
import AdminLayout from '../Layouts/AdminLayout';
import { FaEdit, FaTrash, FaEye, FaPlus } from 'react-icons/fa';
import api from '../../services/api';
import { toast } from 'react-hot-toast';

const AdminClassesPage = () => {
  const navigate = useNavigate();
  const [clases, setClases] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar clases desde el backend
  useEffect(() => {
    fetchClases();
  }, []);

  const fetchClases = async () => {
    try {
      const response = await api.get('/clases');
      setClases(response.data);
    } catch (error) {
      console.error('Error al cargar clases:', error);
      toast.error('Error al cargar clases');
    } finally {
      setLoading(false);
    }
  };

  const handleView = (id) => {
    navigate(`/clases/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/admin/clases/detail/${id}`);
  };

  const handleDelete = async (id) => {
    if (confirm('¿Estás seguro de eliminar esta clase?')) {
      try {
        await api.delete(`/clases/${id}`);
        setClases(clases.filter(c => c.id !== id));
        toast.success('Clase eliminada exitosamente');
      } catch (error) {
        console.error('Error al eliminar:', error);
        toast.error('Error al eliminar la clase');
      }
    }
  };

  const handleAddNew = () => {
    navigate('/admin/clases/detail');
  };

  if (loading) {
    return (
      <div>
        <Breadcrumbs />
        <AdminLayout activeTab="clases">
          <div className="flex justify-center items-center h-64">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        </AdminLayout>
      </div>
    );
  }

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

          {clases.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No hay clases creadas</p>
              <Button onClick={handleAddNew} variant="primary" className="mt-4">
                Crear primera clase
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {clases.map(clase => (
                <div key={clase.id} className="flex justify-between items-center p-4 bg-secondary bg-opacity-20 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-dark text-lg">{clase.nombre}</h3>
                    <div className="flex gap-4 mt-1 text-sm text-gray-600 flex-wrap">
                      <span>Nivel: {clase.nivel}</span>
                      <span>Duración: {clase.duracion} hrs</span>
                      <span>Precio: ${clase.precio?.toLocaleString()}</span>
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
          )}
        </div>
      </AdminLayout>
    </div>
  );
};

export default AdminClassesPage;