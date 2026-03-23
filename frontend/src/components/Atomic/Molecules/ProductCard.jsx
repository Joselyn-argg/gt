import Button from '../Atoms/Button';
import { useCart } from '../../../context/CartContext';

const ProductCard = ({ item, type }) => { // type puede ser 'class' o 'article'
  const { addToCart } = useCart(); // Obtenemos la función para agregar al carrito

  return (
    <div className="border rounded-lg shadow-md p-4 bg-light hover:shadow-lg transition-shadow">
      <img src={item.imagen || '/placeholder-image.jpg'} alt={item.nombre || item.titulo} className="w-full h-48 object-cover rounded-t-lg mb-3" />
      <h3 className="text-xl font-semibold text-dark mb-2">{item.nombre || item.titulo}</h3>
      {type === 'class' && (
        <>
          <p className="text-gray-600 mb-1">Nivel: {item.nivel}</p>
          <p className="text-gray-600 mb-1">Duración: {item.duracion} hrs</p>
          <p className="text-accent font-bold text-lg mb-3">${item.precio?.toLocaleString()}</p>
          <Button variant="accent" className="w-full">
            Ver Detalles
          </Button>
        </>
      )}
      {type === 'article' && (
        <>
          <p className="text-gray-600 mb-2">Autor: {item.autor}</p>
          <p className="text-sm text-gray-500">Fecha publicación: {item.fecha_publicacion}</p>
          {/* Enlace para leer más (lo haremos luego con React Router) */}
        </>
      )}
    </div>
  );
};

export default ProductCard;