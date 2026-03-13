import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../Atomic/Molecules/ProductCard';
import Breadcrumbs from '../Atomic/Molecules/Breadcrumbs';
import api from '../../services/api';

const ClassesPage = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      
      <h1 className="text-3xl font-bold text-dark mb-6">Nuestras Clases</h1>
      
      {classes.length === 0 ? (
        <p className="text-center text-gray-600">No hay clases disponibles</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map(cls => (
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