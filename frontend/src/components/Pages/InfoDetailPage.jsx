import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Breadcrumbs from '../Atomic/Molecules/Breadcrumbs';
import Button from '../Atomic/Atoms/Button';
import BackButton from '../Atomic/Atoms/BackButton';
import { FaBookmark, FaRegBookmark, FaClock, FaUser, FaCalendar } from 'react-icons/fa';
import api from '../../services/api';

const InfoDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

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

  const toggleSave = () => {
    setIsSaved(!isSaved);
    // Aquí podrías agregar lógica para guardar en el backend
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

      {/* Imagen destacada */}
      <div className="relative h-96 rounded-lg overflow-hidden mb-8">
        <img 
          src={article.imagen || article.url_imagen || 'https://via.placeholder.com/1200x400?text=Artículo'} 
          alt={article.titulo}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/1200x400?text=Imagen+no+disponible';
          }}
        />
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

        {/* Contenido - ahora como texto plano, no HTML */}
        <div className="prose prose-lg max-w-none">
          <p className="whitespace-pre-line">{article.contenido}</p>
        </div>
      </article>
    </div>
  );
};

export default InfoDetailPage;