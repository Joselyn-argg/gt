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

const AdminClassFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  const [loading, setLoading] = useState(isEditing);

  const [formData, setFormData] = useState({
    nombre: '',
    categorias: [],
    nivel: 'iniciante',
    duracion: '',
    precio: '',
    cupos: '',
    descripcion: '',
    imagen: ''
  });

  const niveles = ['iniciante', 'intermedio', 'avanzado'];
  const categoriasOptions = ['slalom', 'artístico', 'velocidad', 'principiantes', 'técnicas'];

  // Cargar datos si es edición
  useEffect(() => {
    if (isEditing) {
      const fetchClass = async () => {
        try {
          const response = await api.get(`/clases/${id}`);
          setFormData(response.data);
        } catch (error) {
          console.error('Error al cargar clase:', error);
          toast.error('Error al cargar la clase');
          navigate('/admin/clases');
        } finally {
          setLoading(false);
        }
      };
      fetchClass();
    }
  }, [isEditing, id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoriaChange = (categoria) => {
    setFormData(prev => ({
      ...prev,
      categorias: prev.categorias.includes(categoria)
        ? prev.categorias.filter(c => c !== categoria)
        : [...prev.categorias, categoria]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validaciones
    if (parseInt(formData.precio) <= 0) {
      toast.error('El precio debe ser mayor a 0');
      return;
    }
    if (parseInt(formData.cupos) <= 0) {
      toast.error('Los cupos deben ser mayor a 0');
      return;
    }

    try {
      if (isEditing) {
        await api.put(`/clases/${id}`, formData);
        toast.success('Clase actualizada exitosamente');
      } else {
        await api.post('/clases', formData);
        toast.success('Clase creada exitosamente');
      }
      navigate('/admin/clases');
    } catch (error) {
      console.error('Error al guardar:', error);
      toast.error('Error al guardar la clase');
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
      <BackButton className="mb-4" />
      
      <AdminLayout activeTab="clases">
        <h1 className="text-3xl font-bold text-dark mb-6">
          {isEditing ? 'Editar Clase' : 'Nueva Clase'}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Formulario */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-light rounded-lg shadow-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-dark mb-2">Nombre</label>
                  <Input
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-dark mb-2">Categorías</label>
                  <div className="flex flex-wrap gap-2">
                    {categoriasOptions.map(cat => (
                      <label key={cat} className="flex items-center gap-1">
                        <input
                          type="checkbox"
                          checked={formData.categorias?.includes(cat)}
                          onChange={() => handleCategoriaChange(cat)}
                          className="mr-1"
                        />
                        <span className="text-sm">{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark mb-2">Nivel</label>
                  <select
                    name="nivel"
                    value={formData.nivel}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {niveles.map(n => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark mb-2">Duración (horas)</label>
                  <Input
                    type="number"
                    name="duracion"
                    value={formData.duracion}
                    onChange={handleChange}
                    min="0.5"
                    step="0.5"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark mb-2">Precio</label>
                  <Input
                    type="number"
                    name="precio"
                    value={formData.precio}
                    onChange={handleChange}
                    min="1"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark mb-2">Cupos</label>
                  <Input
                    type="number"
                    name="cupos"
                    value={formData.cupos}
                    onChange={handleChange}
                    min="1"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-dark mb-2">URL Imagen</label>
                  <Input
                    name="imagen"
                    value={formData.imagen}
                    onChange={handleChange}
                    placeholder="https://ejemplo.com/imagen.jpg"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-dark mb-2">Descripción</label>
                  <textarea
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    rows="6"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Escribe la descripción de la clase..."
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
                <h3 className="font-semibold text-dark">{formData.nombre || 'Nombre de clase'}</h3>
                <p className="text-primary font-bold">${parseInt(formData.precio)?.toLocaleString() || '10.000'}</p>
                <Button variant="secondary" className="w-full mt-2 text-sm">
                  Añadir al carrito
                </Button>
              </div>

              <div className="flex gap-2">
                <Button onClick={handlePreview} variant="secondary" className="flex-1 flex items-center justify-center gap-1">
                  <FaEye /> Vista previa
                </Button>
                <Button onClick={handleSubmit} variant="primary" className="flex-1">
                  Guardar clase
                </Button>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </div>
  );
};

export default AdminClassFormPage;