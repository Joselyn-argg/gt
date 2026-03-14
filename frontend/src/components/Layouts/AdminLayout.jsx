import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import Button from '../Atomic/Atoms/Button';

const AdminLayout = ({ children, activeTab }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Menú lateral - SIEMPRE VISIBLE */}
      <div className="md:col-span-1">
        <div className="bg-light rounded-lg shadow-lg p-6 sticky top-4">
          <Link to="/admin" className="flex flex-col items-center mb-6 group">
            <FaUserCircle className="text-6xl text-primary mb-2 group-hover:text-accent transition-colors" />
            <p className="font-semibold text-dark group-hover:text-primary transition-colors">Admin Principal</p>
            <p className="text-sm text-gray-600">admin@escuela.cl</p>
          </Link>

          <nav className="space-y-2">
            <Link 
              to="/admin/clases" 
              className={`block p-2 rounded font-medium ${
                activeTab === 'clases' 
                  ? 'bg-primary text-white' 
                  : 'hover:bg-secondary hover:bg-opacity-50'
              }`}
            >
              Lista de Clases
            </Link>
            <Link 
              to="/admin/informacion" 
              className={`block p-2 rounded font-medium ${
                activeTab === 'articulos' 
                  ? 'bg-primary text-white' 
                  : 'hover:bg-secondary hover:bg-opacity-50'
              }`}
            >
              Lista de Artículos
            </Link>
          </nav>

          <div className="mt-6 pt-4 border-t">
            <Button onClick={handleLogout} variant="warning" className="w-full flex items-center justify-center gap-2">
              <FaSignOutAlt /> Cerrar Sesión
            </Button>
          </div>
        </div>
      </div>

      {/* Contenido principal - CAMBIA SEGÚN LA PÁGINA */}
      <div className="md:col-span-3">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;