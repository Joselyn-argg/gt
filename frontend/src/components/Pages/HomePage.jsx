import { Link } from 'react-router-dom';
import Button from '../Atomic/Atoms/Button';
import { FaRocket, FaHeart, FaUsers, FaTrophy } from 'react-icons/fa';

const HomePage = () => {
  return (
    <div>
      {/* Hero Section con imagen de fondo */}
      <section className="relative rounded-lg p-12 mb-12 text-white overflow-hidden">
        {/* Imagen de fondo */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/hero-bg.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
        </div>
        
        {/* Contenido (encima de la imagen) */}
        <div className="relative z-10 text-center">
          <h1 className="text-6xl font-bold mb-4 animate-bounce">
            ¡A Rodar!
          </h1>
          <p className="text-2xl mb-8">
            Aprende a patinar en un ambiente divertido y seguro
          </p>
          <Link to="/clases">
            <Button variant="accent" className="text-xl px-8 py-3">
              Comienza tu aventura ✨
            </Button>
          </Link>
        </div>
      </section>

      {/* Features divertidos */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-accent bg-opacity-35 p-6 rounded-lg text-center transform hover:scale-105 transition-all">
          <FaRocket className="text-4xl mx-auto mb-3 text-dark" />
          <h3 className="font-bold text-lg mb-2">Todos los niveles</h3>
          <p className="text-gray-600">Desde principiantes hasta expertos</p>
        </div>

        <div className="bg-accent bg-opacity-35 p-6 rounded-lg text-center transform hover:scale-105 transition-all">
          <FaTrophy className="text-4xl mx-auto mb-3 text-dark" />
          <h3 className="font-bold text-lg mb-2">Desde la experiencia</h3>
          <p className="text-gray-600">Aprende con una campeona</p>
        </div>

        <div className="bg-accent bg-opacity-35 p-6 rounded-lg text-center transform hover:scale-105 transition-all">
          <FaUsers className="text-4xl mx-auto mb-3 text-dark" />
          <h3 className="font-bold text-lg mb-2">Clases grupales</h3>
          <p className="text-gray-600">Haz nuevos amigos</p>
        </div>

        <div className="bg-accent bg-opacity-35 p-6 rounded-lg text-center transform hover:scale-105 transition-all">
          <FaHeart className="text-4xl mx-auto mb-3 text-dark" />
          <h3 className="font-bold text-lg mb-2">Mejora tu salud</h3>
          <p className="text-gray-600">Ejercicio divertido</p>
        </div>
      </section>

      <section className="bg-dark bg-opacity-20 p-8 rounded-lg text-dark text-center">
        <h2 className="text-3xl font-bold mb-4">¿Listo para rodar?</h2>
        <p className="text-xl mb-6">
          Únete a nuestra escuela y descubre el maravilloso mundo del patinaje
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/clases">
            <Button variant="accent" className="px-6 py-2">
              Ver clases
            </Button>
          </Link>
          <Link to="/contacto">
            <Button variant="secondary" className="px-6 py-2">
              Contáctanos
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;