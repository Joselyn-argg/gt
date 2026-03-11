import { FaInstagram, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark text-light p-6 mt-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p>&copy; {new Date().getFullYear()} Escuela de Patinaje</p>
            <p className="text-sm mt-2">Respeto, responsabilidad y pasión por el patinaje.</p>
          </div>
          
          {/* Redes sociales */}
          <div className="flex gap-4">
            <a 
              href="https://instagram.com/escuelagatonegro" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-2xl hover:text-accent transition-colors"
            >
              <FaInstagram />
            </a>
            <a 
              href="https://wa.me/56947614738" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-2xl hover:text-accent transition-colors"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;