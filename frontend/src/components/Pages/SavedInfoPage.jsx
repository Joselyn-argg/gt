import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Breadcrumbs from '../Atomic/Molecules/Breadcrumbs';
import Button from '../Atomic/Atoms/Button';
import { FaUserCircle, FaSignOutAlt, FaBookmark, FaTrash, FaEye } from 'react-icons/fa';

const SavedInfoPage = () => {
  const navigate = useNavigate();
  
  // Datos simulados de artículos guardados
  const [savedArticles, setSavedArticles] = useState([
    {
      id: 1,
      titulo: "Cómo elegir tus primeros patines",
      autor: "Profesora Campeona",
      fecha_guardado: "2024-03-01"
    },
    {
      id: 2,
      titulo: "Beneficios del patinaje en niños",
      autor: "Profesora Campeona",
      fecha_guardado: "2024-02-28"
    },
    {
      id: 3,
      titulo: "Técnicas avanzadas de slalom",
      autor: "Profesor Experto",
      fecha_guardado: "2024-02-25"
    }
  ]);

  const handleRemove = (articleId) => {
    setSavedArticles(savedArticles.filter(a => a.id !== articleId));
  };

  const handleViewArticle = (articleId) => {
    navigate(`/informacion/${articleId}`);
  };

  const handleLogout = () => {
    navigate('/');
  };

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
              <p className="font-semibold text-dark">Joselyn Silva</p>
              <p className="text-sm text-gray-600">joselyn@email.com</p>
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
              <h2 className="text-xl font-bold text-dark">Informacion guardad</h2>
            </div>

            {savedArticles.length === 0 ? (
              <p className="text-gray-600 text-center py-8">No tienes artículos guardados</p>
            ) : (
              <div className="space-y-3">
                {savedArticles.map(article => (
                  <div key={article.id} className="flex justify-between items-center p-3 bg-secondary bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors">
                    <div 
                      className="flex-grow cursor-pointer"
                      onClick={() => handleViewArticle(article.id)}
                    >
                      <h3 className="font-semibold text-dark hover:text-primary">{article.titulo}</h3>
                      <p className="text-sm text-gray-600">Por {article.autor} · Guardado el {article.fecha_guardado}</p>
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