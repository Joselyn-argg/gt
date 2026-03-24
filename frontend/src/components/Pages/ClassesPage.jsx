import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../Atomic/Molecules/ProductCard';
import Breadcrumbs from '../Atomic/Molecules/Breadcrumbs';
import api from '../../services/api';
import { CATEGORIAS_CLASES } from '../../constants/classConstants';

const ClassesPage = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await api.get('/clases');
        setClasses(response.data);
        setError(null);
      } catch (err) {
        console.error('Error al cargar clases:', err);
        setError('No se pudieron cargar las clases');
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  const categories = ['Todos', ...CATEGORIAS_CLASES];

  const filteredClasses = selectedCategory === 'Todos' 
    ? classes 
    : classes.filter(cls => 
        cls.categorias && cls.categorias.includes(selectedCategory)
      );

  if (loading) {
    return (
      <div>
        <Breadcrumbs />
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando clases...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Breadcrumbs />
        <div className="text-center py-12">
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Breadcrumbs />
      
      <div className="bg-accent rounded-lg p-8 mb-8 text-white">
        <h1 className="text-4xl font-bold mb-2">Nuestras Clases</h1>
        <p className="text-xl opacity-90">Encuentra la clase perfecta para aprender y mejorar tu técnica</p>
      </div>

      {classes.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-primary text-white shadow-md hover:bg-accent3'
                  : 'bg-secondary text-dark hover:bg-accent2 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}
      
      {filteredClasses.length === 0 ? (
        <p className="text-center text-gray-600">No hay clases disponibles para esta categoría</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClasses.map(cls => (
            <Link key={cls.id} to={`/clases/${cls.id}`}>
              <ProductCard item={cls} type="class" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClassesPage;