import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../Atomic/Molecules/Breadcrumbs';
import Button from '../Atomic/Atoms/Button';
import AdminLayout from '../Layouts/AdminLayout';
import { FaEdit, FaTrash, FaEye, FaPlus } from 'react-icons/fa';
import api from '../../services/api';
import { toast } from 'react-hot-toast';

const AdminInfoPage = () => {
  const navigate = useNavigate();
  const [articulos, setArticulos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar artículos desde el backend
  useEffect(() => {
    fetchArticulos();
  }, []);

  const fetchArticulos = async () => {
    try {
      const response = await api.get('/articulos');
      setArticulos(response.data);
    } catch (error) {
      console.error('Error al cargar artículos:', error);
      toast.error('Error al cargar artículos');
    } finally {
      setLoading(false);
    }
  };

  const handleView = (id) => {
    navigate(`/informacion/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/admin/informacion/detail/${id}`);
  };

  const handleDelete = async (id) => {
    if (confirm('¿Estás seguro de eliminar este artículo?')) {
      try {
        await api.delete(`/articulos/${id}`);
        setArticulos(articulos.filter(a => a.id !== id));
        toast.success('Artículo eliminado');
      } catch (error) {
        console.error('Error al eliminar:', error);
        toast.error('Error al eliminar el artículo');
      }
    }
  };

  const handleAddNew = () => {
    navigate('/admin/informacion/detail');
  };

  if (loading) {
    return (
      <div>
        <Breadcrumbs />
        <AdminLayout activeTab="informacion">
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
      
      <AdminLayout activeTab="informacion">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-dark">Administrar Información</h1>
          <Button onClick={handleAddNew} variant="primary" className="flex items-center gap-2">
            <FaPlus /> Añadir Artículo
          </Button>
        </div>

        <div className="bg-light rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-dark mb-4">Lista de Artículos</h2>

          {articulos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No hay artículos creados</p>
              <Button onClick={handleAddNew} variant="primary" className="mt-4">
                Crear primer artículo
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {articulos.map(articulo => (
                <div key={articulo.id} className="flex justify-between items-center p-4 bg-secondary bg-opacity-20 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-dark text-lg">{articulo.titulo}</h3>
                    <div className="flex gap-4 mt-1 text-sm text-gray-600 flex-wrap">
                      <span>Por: {articulo.autor}</span>
                      <span>Categoría: {articulo.categoria || 'General'}</span>
                      <span>
                        Publicado: {articulo.fecha_publicacion 
                          ? new Date(articulo.fecha_publicacion).toLocaleDateString() 
                          : 'Fecha no disponible'}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleView(articulo.id)}
                      className="p-2 text-primary hover:bg-primary hover:text-white rounded transition-colors"
                      title="Ver"
                    >
                      <FaEye />
                    </button>
                    <button 
                      onClick={() => handleEdit(articulo.id)}
                      className="p-2 text-accent hover:bg-accent hover:text-white rounded transition-colors"
                      title="Editar"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      onClick={() => handleDelete(articulo.id)}
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

export default AdminInfoPage;