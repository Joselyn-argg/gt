import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../Atomic/Molecules/Breadcrumbs';
import Button from '../Atomic/Atoms/Button';
import AdminLayout from '../Layouts/AdminLayout';
import { FaEdit, FaTrash, FaEye, FaPlus } from 'react-icons/fa';

const AdminArticlesPage = () => {
  const navigate = useNavigate();
  
  // Datos simulados de artículos
  const [articulos, setArticulos] = useState([
    { 
      id: 1, 
      titulo: "Cómo elegir tus primeros patines",
      autor: "Profesora Campeona",
      fecha_publicacion: "2024-02-10",
      categoria: "Principiantes"
    },
    { 
      id: 2, 
      titulo: "Beneficios del patinaje en niños",
      autor: "Profesora Campeona",
      fecha_publicacion: "2024-02-05",
      categoria: "Infantil"
    },
    { 
      id: 3, 
      titulo: "Técnicas avanzadas de slalom",
      autor: "Profesor Experto",
      fecha_publicacion: "2024-01-28",
      categoria: "Avanzado"
    }
  ]);

  const handleView = (id) => {
    navigate(`/articulos/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/admin/articulos/detail/${id}`);
  };

  const handleDelete = (id) => {
    if (confirm('¿Estás seguro de eliminar este artículo?')) {
      setArticulos(articulos.filter(a => a.id !== id));
    }
  };

  const handleAddNew = () => {
    navigate('/admin/articulos/detail');
  };

  return (
    <div>
      <Breadcrumbs />
      
      <AdminLayout activeTab="articulos">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-dark">Administrar Artículos</h1>
          <Button onClick={handleAddNew} variant="primary" className="flex items-center gap-2">
            <FaPlus /> Añadir Artículo
          </Button>
        </div>

        <div className="bg-light rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-dark mb-4">Lista de Artículos</h2>

          <div className="space-y-3">
            {articulos.map(articulo => (
              <div key={articulo.id} className="flex justify-between items-center p-4 bg-secondary bg-opacity-20 rounded-lg">
                <div>
                  <h3 className="font-semibold text-dark text-lg">{articulo.titulo}</h3>
                  <div className="flex gap-4 mt-1 text-sm text-gray-600">
                    <span>Por: {articulo.autor}</span>
                    <span>Categoría: {articulo.categoria}</span>
                    <span>Publicado: {articulo.fecha_publicacion}</span>
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
        </div>
      </AdminLayout>
    </div>
  );
};

export default AdminArticlesPage;