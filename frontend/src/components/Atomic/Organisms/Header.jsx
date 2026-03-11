import { Link } from 'react-router-dom';
import NavLink from '../Molecules/NavLink';
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import { useCart } from '../../../context/CartContext';
import logo from '../../../assets/icon-gt-wb.png';

const Header = () => {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.cantidad, 0);

  return (
    <header className="bg-dark text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center gap-2">
          <img src={logo} alt="logo" className="h-8 w-auto" />
          <span>Escuela de Patinaje </span>
        </Link>

        <nav className="flex gap-4 items-center">
          <NavLink to="/">Inicio</NavLink>
          <NavLink to="/clases">Clases</NavLink>
          <NavLink to="/informacion">Información</NavLink>
          <NavLink to="/contacto">Contacto</NavLink>
          
          {/* Perfil de usuario */}
          <Link to="/login" className="text-2xl hover:text-accent3 transition-colors">
            <FaUserCircle />
          </Link>
          {/* Carrito */}
          <Link to="/carrito" className="relative">
            <FaShoppingCart className="text-2xl" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent2 text-dark text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;