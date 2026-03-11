import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Breadcrumbs from '../Atomic/Molecules/Breadcrumbs';
import Button from '../Atomic/Atoms/Button';
import Input from '../Atomic/Atoms/Input';
import BackButton from '../Atomic/Atoms/BackButton';
import AdminLayout from '../Layouts/AdminLayout';
import { toast } from 'react-hot-toast';
import { FaEye } from 'react-icons/fa';

const AdminArticleFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  // Estado del formulario
  const [formData, setFormData] = useState({
    titulo: '',
    subtitulo: '',
    autor: '',
    url_imagen: '',
    contenido: ''
  });

  // Cargar datos si es edición
  useEffect(() => {
    if (isEditing) {
      // Simular carga de datos
      const mockData = {
        id: 1,
        titulo: "Cómo elegir tus primeros patines",
        subtitulo: "Guía completa para principiantes",
        autor: "Profesora Campeona",
        url_imagen: "https://images.unsplash.com/photo-1563089145-599f8c5f5e3d?w=400",
        contenido: "Contenido completo del artículo..."
      };
      setFormData(mockData);
    }
  }, [isEditing, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success(`Artículo ${isEditing ? 'actualizado' : 'creado'} exitosamente`);
    navigate('/admin/articulos');
  };

  const handlePreview = () => {
    toast.success('Vista previa generada');
  };

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

                {/* URL Imagen */}
                <div>
                  <label className="block text-sm font-medium text-dark mb-2">URL Imagen</label>
                  <Input
                    name="url_imagen"
                    value={formData.url_imagen}
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
                {formData.url_imagen && (
                  <img 
                    src={formData.url_imagen} 
                    alt="Preview"
                    className="w-full h-32 object-cover rounded mb-2"
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

export default AdminArticleFormPage;