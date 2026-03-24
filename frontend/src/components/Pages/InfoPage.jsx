import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../Atomic/Molecules/Breadcrumbs';
import Button from '../Atomic/Atoms/Button';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import api from '../../services/api';
import { toast } from 'react-hot-toast';

const InfoPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [user, setUser] = useState(null);
  const [userSavedArticles, setUserSavedArticles] = useState([]);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    fetchArticles();
    fetchUserSavedArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await api.get('/articulos');
      setArticles(response.data);
      setError(null);
    } catch (err) {
      console.error('Error al cargar artículos:', err);
      setError('No se pudieron cargar los artículos');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserSavedArticles = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await api.get('/usuarios/articulos-guardados');
        setUserSavedArticles(response.data.map(a => a.id));
      }
    } catch (error) {
      console.error('Error al cargar artículos guardados:', error);
    }
  };

  const categories = ['Todos', ...new Set(articles.map(a => a.categoria).filter(Boolean))];
  const filteredArticles = selectedCategory === 'Todos' 
    ? articles 
    : articles.filter(a => a.categoria === selectedCategory);

  const toggleSaveArticle = async (articleId) => {
    try {
      if (userSavedArticles.includes(articleId)) {
        await api.delete(`/usuarios/articulos-guardados/${articleId}`);
        setUserSavedArticles(userSavedArticles.filter(id => id !== articleId));
        toast.success('Artículo eliminado de guardados');
      } else {
        await api.post('/usuarios/articulos-guardados', { articleId });
        setUserSavedArticles([...userSavedArticles, articleId]);
        toast.success('Artículo guardado');
      }
    } catch (error) {
      console.error('Error al guardar:', error);
      
      // Verificar si el error es por falta de autenticación
      if (error.response?.status === 401) {
        toast.error('Debes Registrarte o Iniciar sesión para guardar información');
      } else {
        toast.error('Error al guardar artículo');
      }
    }
  };

  if (loading) {
    return (
      <div>
        <Breadcrumbs />
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando artículos...</p>
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
          <Button onClick={() => window.location.reload()} variant="primary" className="mt-4">
            Reintentar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Breadcrumbs />
      
      <div className="bg-accent rounded-lg p-8 mb-8 text-white">
        <h1 className="text-4xl font-bold mb-2">Información</h1>
        <p className="text-xl opacity-90">Consejos, guías y novedades del mundo del patinaje</p>
      </div>

      {articles.length > 0 && (
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

      {filteredArticles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No hay artículos disponibles</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map(article => (
            <article key={article.id} className="bg-light rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={article.imagen || article.url_imagen || 'https://via.placeholder.com/400x200?text=Artículo'} 
                  alt={article.titulo}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x200?text=Imagen+no+disponible';
                  }}
                />
                {user?.tipo_usuario !== 'admin' && (
                  <div className="absolute top-2 right-2">
                    <button
                      onClick={() => toggleSaveArticle(article.id)}
                      className="p-2 bg-white rounded-full shadow-md hover:bg-accent2 transition-colors"
                    >
                      {userSavedArticles.includes(article.id) ? (
                        <FaBookmark className="text-accent text-xl" />
                      ) : (
                        <FaRegBookmark className="text-gray-700 text-xl hover:text-accent3" />
                      )}
                    </button>
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-accent2 text-dark text-xs font-semibold rounded-full">
                    {article.categoria || 'General'}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-dark mb-1 hover:text-accent transition-colors line-clamp-2">
                  {article.titulo}
                </h2>
                <h3 className="text-md text-gray-600 mb-3 line-clamp-1">
                  {article.subtitulo || ''}
                </h3>
                
                <p className="text-gray-700 mb-4 line-clamp-2">
                  {article.descripcion || article.contenido?.substring(0, 100) + '...' || 'Sin descripción'}
                </p>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-accent hover:text-accent3 transition-colors">
                      {article.autor || 'Autor'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {article.fecha_publicacion 
                        ? new Date(article.fecha_publicacion).toLocaleDateString() 
                        : 'Fecha no disponible'}
                    </p>
                  </div>
                  
                  <Link to={`/informacion/${article.id}`}>
                    <Button variant="accent" className="text-sm hover:bg-accent3">
                      Leer más →
                    </Button>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default InfoPage;