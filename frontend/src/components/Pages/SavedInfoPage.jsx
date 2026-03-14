import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Breadcrumbs from '../Atomic/Molecules/Breadcrumbs';
import Button from '../Atomic/Atoms/Button';
import { FaUserCircle, FaSignOutAlt, FaBookmark, FaTrash, FaEye } from 'react-icons/fa';
import api from '../../services/api';
import { toast } from 'react-hot-toast';

const SavedInfoPage = () => {
  const navigate = useNavigate();
  const [savedArticles, setSavedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({ nombre: 'Usuario', email: '' });

  useEffect(() => {
    // Obtener usuario del localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    fetchSavedArticles();
  }, []);

  const fetchSavedArticles = async () => {
    try {
      // Endpoint real para obtener artículos guardados del usuario
      const response = await api.get('/usuarios/articulos-guardados');
      setSavedArticles(response.data);
    } catch (error) {
      console.error('Error al cargar artículos guardados:', error);
      toast.error('Error al cargar artículos guardados');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (articleId) => {
    try {
      await api.delete(`/usuarios/articulos-guardados/${articleId}`);
      setSavedArticles(savedArticles.filter(a => a.id !== articleId));
      toast.success('Artículo eliminado de guardados');
    } catch (error) {
      console.error('Error al eliminar:', error);
      toast.error('Error al eliminar artículo');
    }
  };

  const handleViewArticle = (articleId) => {
    navigate(`/informacion/${articleId}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <Breadcrumbs />
      
      <h1 className="text-3xl font-bold text-dark mb-6">Mi Perfil</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Menú lateral */}
        <div className="md:col-span-1">
          <div className="bg-light rounded-lg shadow-lg p-6">
            <div className="flex flex-col items-center mb-6">
              <FaUserCircle className="text-6xl text-primary mb-2" />
              <p className="font-semibold text-dark">{user.nombre || 'Usuario'}</p>
              <p className="text-sm text-gray-600">{user.email || ''}</p>
            </div>

            <nav className="space-y-2">
              <Link to="/perfil" className="block p-2 hover:bg-secondary hover:bg-opacity-50 rounded font-medium">
                Mi Perfil
              </Link>
              <Link to="/perfil/guardados" className="block p-2 bg-primary text-white rounded font-medium">
                Información guardada
              </Link>
            </nav>

            <div className="mt-6 pt-4 border-t">
              <Button onClick={handleLogout} variant="warning" className="w-full flex items-center justify-center gap-2">
                <FaSignOutAlt /> Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>

        {/* Lista de artículos guardados */}
        <div className="md:col-span-3">
          <div className="bg-light rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <FaBookmark className="text-primary" />
              <h2 className="text-xl font-bold text-dark">Información guardada</h2>
            </div>

            {savedArticles.length === 0 ? (
              <div className="text-center py-12">
                <FaBookmark className="text-4xl text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No has guardado información</p>
                <Link to="/informacion">
                  <Button variant="primary" className="mt-4">
                    Explorar artículos
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {savedArticles.map(article => (
                  <div key={article.id} className="flex justify-between items-center p-3 bg-secondary bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors">
                    <div 
                      className="flex-grow cursor-pointer"
                      onClick={() => handleViewArticle(article.id)}
                    >
                      <h3 className="font-semibold text-dark hover:text-primary">{article.titulo}</h3>
                      <p className="text-sm text-gray-600">
                        Por {article.autor} · {article.fecha_publicacion 
                          ? new Date(article.fecha_publicacion).toLocaleDateString() 
                          : 'Fecha no disponible'}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleViewArticle(article.id)}
                        className="p-2 text-primary hover:bg-primary hover:text-white rounded transition-colors"
                        title="Ver artículo"
                      >
                        <FaEye />
                      </button>
                      <button 
                        onClick={() => handleRemove(article.id)}
                        className="p-2 text-gray-600 hover:text-red-500 transition-colors"
                        title="Eliminar de guardados"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedInfoPage;