import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Breadcrumbs from '../Atomic/Molecules/Breadcrumbs';
import Button from '../Atomic/Atoms/Button';
import Input from '../Atomic/Atoms/Input';
import BackButton from '../Atomic/Atoms/BackButton';
import AdminLayout from '../Layouts/AdminLayout';
import { toast } from 'react-hot-toast';
import { FaEye } from 'react-icons/fa';
import api from '../../services/api';

const AdminInfoFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  const [loading, setLoading] = useState(isEditing);

  const [formData, setFormData] = useState({
    titulo: '',
    subtitulo: '',
    autor: '',
    imagen: '',
    contenido: '',
    categoria: ''
  });

  // Cargar datos si es edición
  useEffect(() => {
    if (isEditing) {
      const fetchArticle = async () => {
        try {
          const response = await api.get(`/articulos/${id}`);
          setFormData(response.data);
        } catch (error) {
          console.error('Error al cargar artículo:', error);
          toast.error('Error al cargar el artículo');
          navigate('/admin/informacion');
        } finally {
          setLoading(false);
        }
      };
      fetchArticle();
    }
  }, [isEditing, id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (isEditing) {
        await api.put(`/articulos/${id}`, formData);
        toast.success('Artículo actualizado exitosamente');
      } else {
        await api.post('/articulos', formData);
        toast.success('Artículo creado exitosamente');
      }
      navigate('/admin/informacion');
    } catch (error) {
      console.error('Error al guardar:', error);
      toast.error('Error al guardar el artículo');
    }
  };

  const handlePreview = () => {
    toast.success('Vista previa generada');
  };

  if (loading) {
    return (
      <div>
        <Breadcrumbs />
        <BackButton className="mb-4" />
        <AdminLayout activeTab="articulos">
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
      <BackButton className="mb-4" />
      
      <AdminLayout activeTab="articulos">
        <h1 className="text-3xl font-bold text-dark mb-6">
          {isEditing ? 'Editar Artículo' : 'Nuevo Artículo'}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Formulario */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-light rounded-lg shadow-lg p-6">
              <div className="space-y-4">
                {/* Título */}
                <div>
                  <label className="block text-sm font-medium text-dark mb-2">Título</label>
                  <Input
                    name="titulo"
                    value={formData.titulo}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Subtítulo */}
                <div>
                  <label className="block text-sm font-medium text-dark mb-2">Subtítulo</label>
                  <Input
                    name="subtitulo"
                    value={formData.subtitulo}
                    onChange={handleChange}
                  />
                </div>

                {/* Autor */}
                <div>
                  <label className="block text-sm font-medium text-dark mb-2">Autor</label>
                  <Input
                    name="autor"
                    value={formData.autor}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Categoría */}
                <div>
                  <label className="block text-sm font-medium text-dark mb-2">Categoría</label>
                  <Input
                    name="categoria"
                    value={formData.categoria}
                    onChange={handleChange}
                    placeholder="Ej: Principiantes, Avanzado, Salud..."
                  />
                </div>

                {/* URL Imagen */}
                <div>
                  <label className="block text-sm font-medium text-dark mb-2">URL Imagen</label>
                  <Input
                    name="imagen"
                    value={formData.imagen}
                    onChange={handleChange}
                    placeholder="https://ejemplo.com/imagen.jpg"
                  />
                </div>

                {/* Contenido */}
                <div>
                  <label className="block text-sm font-medium text-dark mb-2">Contenido</label>
                  <textarea
                    name="contenido"
                    value={formData.contenido}
                    onChange={handleChange}
                    rows="8"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>
            </form>
          </div>

          {/* Vista previa */}
          <div className="lg:col-span-1">
            <div className="bg-light rounded-lg shadow-lg p-6 sticky top-4">
              <h2 className="text-xl font-bold text-dark mb-4">Vista previa</h2>
              
              <div className="border rounded-lg p-4 mb-4">
                {formData.imagen && (
                  <img 
                    src={formData.imagen} 
                    alt="Preview"
                    className="w-full h-32 object-cover rounded mb-2"
                    onError={(e) => e.target.src = 'https://via.placeholder.com/400x200?text=Sin+imagen'}
                  />
                )}
                <h3 className="font-semibold text-dark">{formData.titulo || 'Título del artículo'}</h3>
                <p className="text-sm text-gray-600">{formData.autor || 'Autor'}</p>
                <p className="text-xs text-gray-500 mt-2 line-clamp-2">{formData.contenido || 'Vista previa del contenido...'}</p>
                <Button variant="secondary" className="w-full mt-2 text-sm">
                  Ver más
                </Button>
              </div>

              <div className="flex gap-2">
                <Button onClick={handlePreview} variant="secondary" className="flex-1 flex items-center justify-center gap-1">
                  <FaEye /> Vista previa
                </Button>
                <Button onClick={handleSubmit} variant="primary" className="flex-1">
                  Guardar artículo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </div>
  );
};

export default AdminInfoFormPage;