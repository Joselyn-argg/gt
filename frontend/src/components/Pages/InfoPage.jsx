import { useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../Atomic/Molecules/Breadcrumbs';
import Button from '../Atomic/Atoms/Button';
import { FaBookmark, FaRegBookmark, FaClock } from 'react-icons/fa';

const InfoPage = () => {
  // Estado para los artículos (simulado)
  const [articles] = useState([
    {
      id: 1,
      titulo: "Cómo elegir tus primeros patines",
      subtitulo: "Guía completa para principiantes",
      autor: "Profesora Campeona",
      url_imagen: "https://contents.mediadecathlon.com/p2351530/k$7806eb9e9966765e62cfd2a1adf093e1/1200x0/1.91cr1/default.jpg?format=auto",
      fecha_publicacion: "2024-02-10",
      tiempo_lectura: "5 min",
      categoria: "Principiantes",
      descripcion: "Descubre todo lo que necesitas saber para elegir tus primeros patines..."
    },
    {
      id: 2,
      titulo: "Beneficios del patinaje en niños",
      subtitulo: "Desarrollo físico y emocional",
      autor: "Profesora Campeona",
      url_imagen: "https://www.inercia.com/blog/wp-content/uploads/2012/02/patines-infantiles1.jpg",
      fecha_publicacion: "2024-02-05",
      tiempo_lectura: "4 min",
      categoria: "Infantil",
      descripcion: "El patinaje ayuda al desarrollo de la coordinación y confianza..."
    },
    {
      id: 3,
      titulo: "Técnicas avanzadas de slalom",
      subtitulo: "Domina los conos",
      autor: "Profesor Experto",
      url_imagen: "https://i.ytimg.com/vi/h1y7r6uBRhs/maxresdefault.jpg",
      fecha_publicacion: "2024-01-28",
      tiempo_lectura: "7 min",
      categoria: "Avanzado",
      descripcion: "Aprende las técnicas más avanzadas para dominar el slalom..."
    },
    {
      id: 4,
      titulo: "Prevención de lesiones",
      subtitulo: "Tips para patinar seguro",
      autor: "Equipo Médico",
      url_imagen: "https://canalsalud.imq.es/hubfs/Imported_Blog_Media/6-medidas-para-prevenir-lesiones-1.png",
      fecha_publicacion: "2024-01-20",
      tiempo_lectura: "6 min",
      categoria: "Salud",
      descripcion: "Los mejores ejercicios y prácticas para evitar lesiones..."
    }
  ]);

  // Estado para artículos guardados (simulado)
  const [savedArticles, setSavedArticles] = useState([]);
  
  // Estado para filtro de categoría
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  
  // Categorías únicas
  const categories = ['Todos', ...new Set(articles.map(a => a.categoria))];

  // Filtrar artículos por categoría
  const filteredArticles = selectedCategory === 'Todos' 
    ? articles 
    : articles.filter(a => a.categoria === selectedCategory);

  // Función para guardar/quitar artículo
  const toggleSaveArticle = (articleId) => {
    if (savedArticles.includes(articleId)) {
      setSavedArticles(savedArticles.filter(id => id !== articleId));
    } else {
      setSavedArticles([...savedArticles, articleId]);
    }
  };

  return (
    <div>
      <Breadcrumbs />
      
      {/* Header con gradiente */}
      <div className="bg-accent rounded-lg p-8 mb-8 text-white">
        <h1 className="text-4xl font-bold mb-2">Información</h1>
        <p className="text-xl opacity-90">Consejos, guías y novedades del mundo del patinaje</p>
      </div>

      {/* Filtros por categoría */}
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

      {/* Grid de artículos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map(article => (
          <article key={article.id} className="bg-light rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1">
            {/* Imagen */}
            <div className="relative h-48 overflow-hidden">
              <img 
                src={article.url_imagen} 
                alt={article.titulo}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <button
                  onClick={() => toggleSaveArticle(article.id)}
                  className="p-2 bg-white rounded-full shadow-md hover:bg-accent2 transition-colors"
                >
                  {savedArticles.includes(article.id) ? (
                    <FaBookmark className="text-accent text-xl" />
                  ) : (
                    <FaRegBookmark className="text-gray-700 text-xl hover:text-accent3" />
                  )}
                </button>
              </div>
            </div>

            {/* Contenido */}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-accent2 text-dark text-xs font-semibold rounded-full">
                  {article.categoria}
                </span>
                <span className="flex items-center gap-1 text-gray-500 text-xs">
                  <FaClock /> {article.tiempo_lectura}
                </span>
              </div>

              <h2 className="text-xl font-bold text-dark mb-1 hover:text-accent transition-colors">{article.titulo}</h2>
              <h3 className="text-md text-gray-600 mb-3">{article.subtitulo}</h3>
              
              <p className="text-gray-700 mb-4 line-clamp-2">{article.descripcion}</p>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-accent hover:text-accent3 transition-colors">{article.autor}</p>
                  <p className="text-xs text-gray-500">{article.fecha_publicacion}</p>
                </div>
                
                {/* ✅ CORREGIDO: Link a /informacion en lugar de /articulos */}
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

      {/* Mensaje si no hay artículos */}
      {filteredArticles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No hay artículos en esta categoría</p>
        </div>
      )}
    </div>
  );
};

export default InfoPage;