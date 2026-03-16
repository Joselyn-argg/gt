import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Breadcrumbs from '../Atomic/Molecules/Breadcrumbs';
import Button from '../Atomic/Atoms/Button';
import BackButton from '../Atomic/Atoms/BackButton';
import { FaBookmark, FaRegBookmark, FaClock, FaUser, FaCalendar } from 'react-icons/fa';
import api from '../../services/api';
import { toast } from 'react-hot-toast';

const InfoDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [user, setUser] = useState(null);

  // Cargar artículo desde el backend
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await api.get(`/articulos/${id}`);
        setArticle(response.data);
        setError(null);
      } catch (err) {
        console.error('Error al cargar artículo:', err);
        if (err.response?.status === 404) {
          navigate('/404');
        } else {
          setError('Error al cargar el artículo');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id, navigate]);

  // Cargar usuario y verificar artículo guardado
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    const checkIfSaved = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token && article) {
          const response = await api.get('/usuarios/articulos-guardados');
          const savedIds = response.data.map(a => a.id);
          setIsSaved(savedIds.includes(article.id));
        }
      } catch (error) {
        console.error('Error al verificar artículo guardado:', error);
      }
    };
    
    if (article) {
      checkIfSaved();
    }
  }, [article]);

  const toggleSave = async () => {
    try {
      if (isSaved) {
        await api.delete(`/usuarios/articulos-guardados/${article.id}`);
        setIsSaved(false);
        toast.success('Artículo eliminado de guardados');
      } else {
        await api.post('/usuarios/articulos-guardados', { articleId: article.id });
        setIsSaved(true);
        toast.success('Artículo guardado');
      }
    } catch (error) {
      console.error('Error al guardar:', error);
      toast.error('Error al guardar artículo');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando artículo...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg">{error}</p>
        <BackButton className="mt-4" />
      </div>
    );
  }

  if (!article) return null;

  return (
    <div>
      <Breadcrumbs />
      <BackButton className="mb-4" />

      <div className="relative h-96 rounded-lg overflow-hidden mb-8">
        <img 
          src={article.imagen || article.url_imagen || 'https://via.placeholder.com/1200x400?text=Artículo'} 
          alt={article.titulo}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/1200x400?text=Imagen+no+disponible';
          }}
        />
        {/* Botón de guardar solo para no-admin */}
        {user?.tipo_usuario !== 'admin' && (
          <div className="absolute top-4 right-4">
            <button
              onClick={toggleSave}
              className="p-3 bg-white rounded-full shadow-lg hover:bg-accent transition-colors"
            >
              {isSaved ? (
                <FaBookmark className="text-accent text-xl" />
              ) : (
                <FaRegBookmark className="text-gray-700 text-xl" />
              )}
            </button>
          </div>
        )}
      </div>

      {/* Contenido del artículo */}
      <article className="max-w-3xl mx-auto">
        {/* Metadatos */}
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-600 flex-wrap">
          <span className="px-3 py-1 bg-accent3 rounded-full text-xs font-semibold">
            {article.categoria || 'General'}
          </span>
          <span className="flex items-center gap-1">
            <FaUser /> {article.autor || 'Autor'}
          </span>
          <span className="flex items-center gap-1">
            <FaCalendar /> 
            {article.fecha_publicacion 
              ? new Date(article.fecha_publicacion).toLocaleDateString('es-CL', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })
              : 'Fecha no disponible'}
          </span>
        </div>

        {/* Título */}
        <h1 className="text-4xl font-bold text-dark mb-2">{article.titulo}</h1>
        <h2 className="text-xl text-gray-600 mb-8">{article.subtitulo}</h2>

        {/* Contenido - como texto plano */}
        <div className="prose prose-lg max-w-none">
          <p className="whitespace-pre-line">{article.contenido}</p>
        </div>
      </article>
    </div>
  );
};

export default InfoDetailPage;