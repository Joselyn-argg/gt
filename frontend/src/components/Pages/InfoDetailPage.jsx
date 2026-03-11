import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Breadcrumbs from '../Atomic/Molecules/Breadcrumbs';
import Button from '../Atomic/Atoms/Button';
import BackButton from '../Atomic/Atoms/BackButton';
import { FaBookmark, FaRegBookmark, FaClock, FaUser, FaCalendar } from 'react-icons/fa';

const InfoDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  // Simular carga de datos
  useEffect(() => {
    const articlesData = [
      { 
        id: 1, 
        titulo: "Cómo elegir tus primeros patines", 
        subtitulo: "Guía completa para principiantes", 
        autor: "Profesora Campeona", 
        url_imagen: "https://contents.mediadecathlon.com/p2351530/k$7806eb9e9966765e62cfd2a1adf093e1/1200x0/1.91cr1/default.jpg?format=auto", 
        fecha_publicacion: "10 Febrero, 2024", 
        tiempo_lectura: "5 min",
        categoria: "Principiantes",
        contenido: `
          <p>Elegir tus primeros patines puede ser abrumador con tantas opciones disponibles. En esta guía, te ayudaremos a tomar la mejor decisión según tu nivel y objetivos.</p>
          
          <h2>Tipos de patines</h2>
          <p>Existen principalmente 4 tipos de patines: quad (4 ruedas), inline (en línea), agresivos y de velocidad. Para principiantes, recomendamos patines inline o quad dependiendo de tus preferencias.</p>
          
          <h2>Tamaño y ajuste</h2>
          <p>El ajuste es crucial. Deben quedar justos pero sin apretar demasiado. Prueba siempre con los calcetines que usarás para patinar.</p>
          
          <h2>Ruedas y rodamientos</h2>
          <p>Para empezar, busca ruedas blandas (78A-82A) que absorben mejor las vibraciones. Los rodamientos ABEC 3 o 5 son suficientes para principiantes.</p>
          
          <h2>Protecciones</h2>
          <p>No olvides comprar casco, rodilleras, coderas y muñequeras. La seguridad es lo primero.</p>
        `
      },
      { 
        id: 2, 
        titulo: "Beneficios del patinaje en niños", 
        subtitulo: "Desarrollo físico y emocional", 
        autor: "Profesora Campeona", 
        url_imagen: "https://www.inercia.com/blog/wp-content/uploads/2012/02/patines-infantiles1.jpg", 
        fecha_publicacion: "5 Febrero, 2024", 
        tiempo_lectura: "4 min",
        categoria: "Infantil",
        contenido: `
          <p>El patinaje es una actividad completa que aporta innumerables beneficios a los niños, tanto a nivel físico como emocional.</p>
          
          <h2>Beneficios físicos</h2>
          <p>Mejora el equilibrio, la coordinación y la fuerza muscular. Además, es un excelente ejercicio cardiovascular que ayuda a mantener un peso saludable.</p>
          
          <h2>Beneficios emocionales</h2>
          <p>Aumenta la autoestima, enseña perseverancia y disciplina. Los niños aprenden a superar retos y a celebrar sus logros.</p>
          
          <h2>Socialización</h2>
          <p>Las clases grupales fomentan la amistad y el trabajo en equipo. Los niños hacen nuevos amigos mientras se divierten.</p>
        `
      },
      { 
        id: 3, 
        titulo: "Técnicas avanzadas de slalom", 
        subtitulo: "Domina los conos", 
        autor: "Profesor Experto", 
        url_imagen: "https://i.ytimg.com/vi/h1y7r6uBRhs/maxresdefault.jpg", 
        fecha_publicacion: "28 Enero, 2024", 
        tiempo_lectura: "7 min",
        categoria: "Avanzado",
        contenido: `
          <p>El slalom es una disciplina que combina técnica, velocidad y creatividad. Aquí te enseñamos técnicas avanzadas para llevar tu nivel al siguiente nivel.</p>
          
          <h2>Posición básica</h2>
          <p>Mantén las rodillas flexionadas y el centro de gravedad bajo. Los brazos deben estar relajados para ayudar en el equilibrio.</p>
          
          <h2>Cross</h2>
          <p>El movimiento fundamental del slalom. Practica cruzar un pie sobre el otro manteniendo el ritmo y la fluidez.</p>
          
          <h2>Eagle</h2>
          <p>Una posición más avanzada donde las puntas miran hacia afuera. Requiere mucha flexibilidad y práctica.</p>
        `
      },
      { 
        id: 4, 
        titulo: "Prevención de lesiones", 
        subtitulo: "Tips para patinar seguro", 
        autor: "Equipo Médico", 
        url_imagen: "https://canalsalud.imq.es/hubfs/Imported_Blog_Media/6-medidas-para-prevenir-lesiones-1.png", 
        fecha_publicacion: "20 Enero, 2024", 
        tiempo_lectura: "6 min",
        categoria: "Salud",
        contenido: `
          <p>Patinar es seguro si tomas las precauciones adecuadas. Aquí tienes consejos para evitar lesiones y disfrutar al máximo.</p>
          
          <h2>Calentamiento</h2>
          <p>Nunca skipees el calentamiento. Dedica 10-15 minutos a ejercicios de movilidad articular y estiramientos dinámicos.</p>
          
          <h2>Equipo de protección</h2>
          <p>Usa siempre casco, rodilleras, coderas y muñequeras. Incluso los patinadores experimentados pueden caer.</p>
          
          <h2>Escucha a tu cuerpo</h2>
          <p>Si sientes dolor, descansa. Forzar puede llevar a lesiones graves. Aprende a diferenciar entre molestias normales y dolor de alerta.</p>
        `
      }
    ];

    const foundArticle = articlesData.find(a => a.id === parseInt(id));
    
    setTimeout(() => {
      if (foundArticle) {
        setArticle(foundArticle);
      } else {
        navigate('/404');
      }
      setLoading(false);
    }, 500);
  }, [id, navigate]);

  const toggleSave = () => {
    setIsSaved(!isSaved);
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

  if (!article) return null;

  return (
    <div>
      <Breadcrumbs />
      <BackButton className="mb-4" />

      {/* Imagen destacada */}
      <div className="relative h-96 rounded-lg overflow-hidden mb-8">
        <img 
          src={article.url_imagen} 
          alt={article.titulo}
          className="w-full h-full object-cover"
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
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
          <span className="px-3 py-1 bg-accent3 rounded-full text-xs font-semibold">
            {article.categoria}
          </span>
          <span className="flex items-center gap-1">
            <FaUser /> {article.autor}
          </span>
          <span className="flex items-center gap-1">
            <FaCalendar /> {article.fecha_publicacion}
          </span>
          <span className="flex items-center gap-1">
            <FaClock /> {article.tiempo_lectura} lectura
          </span>
        </div>

        {/* Título */}
        <h1 className="text-4xl font-bold text-dark mb-2">{article.titulo}</h1>
        <h2 className="text-xl text-gray-600 mb-8">{article.subtitulo}</h2>

        {/* Contenido HTML */}
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: article.contenido }}
        />
      </article>
    </div>
  );
};

export default InfoDetailPage;