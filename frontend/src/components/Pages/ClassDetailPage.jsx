// Página de detalle de una clase
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Breadcrumbs from '../Atomic/Molecules/Breadcrumbs';
import Button from '../Atomic/Atoms/Button';
import BackButton from '../Atomic/Atoms/BackButton';
import { useCart } from '../../context/CartContext';
import { FaClock, FaUser, FaTag, FaShoppingCart } from 'react-icons/fa';

const ClassDetailPage = () => {
  const { id } = useParams(); // Obtiene el ID de la URL
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  // Simular carga de datos (esto luego será con axios)
  useEffect(() => {
    // Datos de ejemplo (igual que en ClassesPage)
    const classesData = [
      { 
        id: 1, 
        nombre: "Iniciación al Slalom", 
        nivel: "iniciante", 
        duracion: 1.5, 
        precio: 15000, 
        imagen: "https://esqueit.com/wp-content/uploads/2018/08/Qu%C3%A9-es-el-freestyle-slalom-1.jpg",
        descripcion: "Aprende las bases del slalom, la disciplina que combina técnica y velocidad. Ideal para quienes dan sus primeros pasos en el mundo del patinaje artístico sobre ruedas.",
        cupos: 8,
        horarios: ["Lunes 10:00 - 11:30", "Miércoles 16:00 - 17:30", "Sábado 11:00 - 12:30"],
        incluye: ["Uso de pista", "Conos de práctica", "Profesor especializado", "Certificado de participación"],
        requisitos: ["Patines propios", "Equipo de protección completo", "Ganas de aprender"]
      },
      { 
        id: 2, 
        nombre: "Técnicas de Freno", 
        nivel: "intermedio", 
        duracion: 1, 
        precio: 12000, 
        imagen: "https://cdn.shopify.com/s/files/1/0753/3432/0395/files/blog_1.webp?v=1753858531",
        descripcion: "Domina diferentes técnicas de frenado para patinar con total seguridad. Aprenderás a controlar tu velocidad y detenerte en cualquier situación.",
        cupos: 10,
        horarios: ["Martes 11:00 - 12:00", "Jueves 17:00 - 18:00", "Domingo 10:00 - 11:00"],
        incluye: ["Uso de pista", "Material didáctico", "Profesor especializado"],
        requisitos: ["Nivel básico de patinaje", "Patines propios", "Equipo de protección"]
      },
      
    ];

    const foundClass = classesData.find(c => c.id === parseInt(id));
    
    setTimeout(() => {
      if (foundClass) {
        setClassData(foundClass);
      } else {
        navigate('/404');
      }
      setLoading(false);
    }, 500);
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (classData) {
      // Crear un objeto con la estructura que espera el carrito
      const itemToAdd = {
        id: classData.id,
        nombre: classData.nombre,
        precio: classData.precio,
        imagen: classData.imagen,
        cantidad: quantity
      };
      
      // Agregar al carrito (la cantidad se maneja en el contexto)
      for (let i = 0; i < quantity; i++) {
        addToCart(itemToAdd);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando clase...</p>
        </div>
      </div>
    );
  }

  if (!classData) return null;

  return (
    <div>
      <Breadcrumbs />
      <BackButton className="mb-4" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Columna izquierda: Imagen y detalles principales */}
        <div className="lg:col-span-2">
          <img 
            src={classData.imagen} 
            alt={classData.nombre}
            className="w-full h-96 object-cover rounded-lg shadow-lg mb-6"
          />
          
          <h1 className="text-3xl font-bold text-dark mb-2">{classData.nombre}</h1>
          
          <div className="flex gap-4 mb-4">
            <span className="px-3 py-1 bg-primary bg-opacity-20 rounded-full text-sm">
              Nivel: {classData.nivel}
            </span>
            <span className="px-3 py-1 bg-accent2 bg-opacity-20 rounded-full text-sm">
              <FaClock className="inline mr-1" /> {classData.duracion} horas
            </span>
          </div>

          <p className="text-gray-700 mb-6">{classData.descripcion}</p>

          {/* Horarios disponibles */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-dark mb-3">Horarios disponibles</h3>
            <div className="space-y-2">
              {classData.horarios.map((horario, index) => (
                <div key={index} className="bg-secondary bg-opacity-20 p-3 rounded-lg">
                  {horario}
                </div>
              ))}
            </div>
          </div>

          {/* Qué incluye */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-dark mb-3">La clase incluye</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {classData.incluye.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Requisitos */}
          <div>
            <h3 className="text-xl font-bold text-dark mb-3">Requisitos</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {classData.requisitos.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Columna derecha: Compra */}
        <div className="lg:col-span-1">
          <div className="bg-light sticky top-4 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-dark mb-4">Reserva tu clase</h2>
            
            <div className="text-3xl font-bold text-primary mb-4">
              ${classData.precio.toLocaleString()}
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                <FaUser className="inline mr-1" /> Cupos disponibles: {classData.cupos}
              </p>
            </div>

            {/* Selector de cantidad */}
            <div className="mb-6">
              <label htmlFor="quantity" className="block text-sm font-medium text-dark mb-2">
                Cantidad
              </label>
              <input
                type="number"
                id="quantity"
                min="1"
                max={classData.cupos}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            {/* Boton añadir */}
            <Button 
              onClick={handleAddToCart}
              variant="accent"
              className="w-full mb-3"
            >
              <FaShoppingCart className="inline mr-2" />
              Añadir al carrito
            </Button>

            {/* Total */}
            <div className="mt-4 pt-4 border-t text-right">
              <p className="text-sm text-gray-600">Total:</p>
              <p className="text-2xl font-bold text-dark">
                ${(classData.precio * quantity).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassDetailPage;