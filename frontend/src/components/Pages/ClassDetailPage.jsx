import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Breadcrumbs from '../Atomic/Molecules/Breadcrumbs';
import Button from '../Atomic/Atoms/Button';
import BackButton from '../Atomic/Atoms/BackButton';
import { useCart } from '../../context/CartContext';
import { FaClock, FaUser, FaShoppingCart } from 'react-icons/fa';
import api from '../../services/api';

const ClassDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchClass = async () => {
      try {
        const response = await api.get(`/clases/${id}`);
        setClassData(response.data);
        setError(null);
      } catch (err) {
        console.error('Error:', err);
        if (err.response?.status === 404) {
          navigate('/404');
        } else {
          setError('Error al cargar la clase');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchClass();
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (classData) {
      for (let i = 0; i < quantity; i++) {
        addToCart(classData);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !classData) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg">{error || 'Clase no encontrada'}</p>
        <BackButton className="mt-4" />
      </div>
    );
  }

  return (
    <div>
      <Breadcrumbs />
      <BackButton className="mb-4" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <img 
            src={classData.imagen || 'https://via.placeholder.com/800x400'} 
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

          {classData.horarios && classData.horarios.length > 0 && (
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
          )}

          {classData.incluye && classData.incluye.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-bold text-dark mb-3">La clase incluye</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {classData.incluye.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-light sticky top-4 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-dark mb-4">Reserva tu clase</h2>
            
            <div className="text-3xl font-bold text-primary mb-4">
              ${classData.precio?.toLocaleString()}
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                <FaUser className="inline mr-1" /> Cupos disponibles: {classData.cupos || 10}
              </p>
            </div>

            <div className="mb-6">
              <label htmlFor="quantity" className="block text-sm font-medium text-dark mb-2">
                Cantidad
              </label>
              <input
                type="number"
                id="quantity"
                min="1"
                max={classData.cupos || 10}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <Button onClick={handleAddToCart} variant="accent" className="w-full mb-3">
              <FaShoppingCart className="inline mr-2" />
              Añadir al carrito
            </Button>

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