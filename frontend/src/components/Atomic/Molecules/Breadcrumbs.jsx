import { Link, useLocation } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <nav className="text-sm mb-4" aria-label="Breadcrumb">
      <ol className="list-none p-0 inline-flex items-center">
        <li className="flex items-center">
          <Link to="/" className="text-gray-800 hover:text-dark font-medium">
            <FaHome className="inline mr-1" /> Inicio
          </Link>
        </li>
        
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const displayName = name.charAt(0).toUpperCase() + name.slice(1);

          return (
            <li key={name} className="flex items-center">
              <span className="mx-2 text-gray-500">/</span>
              {isLast ? (
                <span className="text-gray-900 font-semibold">{displayName}</span>
              ) : (
                <Link to={routeTo} className="text-gray-800 hover:text-dark font-medium">
                  {displayName}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;