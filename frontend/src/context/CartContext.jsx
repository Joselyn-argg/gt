import { createContext, useContext, useState, useEffect } from 'react';
// Se mporta una librería para mostrar alertas mejorando el UX
import { toast } from 'react-hot-toast'; 

// 1. Crear el contexto
const CartContext = createContext();

// 2. Proveedor del contexto. Envuelve la aplicación y provee el estado del carrito a todos los hijos.
export const CartProvider = ({ children }) => {
  // Estado del carrito. Inicializamos con los datos de localStorage (si existen)
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Efecto para guardar el carrito en localStorage CADA VEZ que cartItems cambie.
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Función para agregar un item al carrito
  const addToCart = (classToAdd) => {
    setCartItems((prevItems) => {
      // Buscamos si el item ya existe en el carrito
      const existingItem = prevItems.find(item => item.id === classToAdd.id);
      
      if (existingItem) {
        // Si existe, aumentamos la cantidad
        const updatedItems = prevItems.map(item =>
          item.id === classToAdd.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
        toast.success('Cantidad actualizada en el carrito', { id: 'update-cart' }); // Alerta
        return updatedItems;
      } else {
        // Si no existe, lo agregamos con cantidad 1
        toast.success('Clase añadida al carrito', { id: 'add-to-cart' }); // Alerta
        return [...prevItems, { ...classToAdd, cantidad: 1 }];
      }
    });
  };

  // Función para eliminar un item del carrito
  const removeFromCart = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    toast.success('Clase eliminada del carrito');
  };

  // Función para actualizar la cantidad de un item
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId); // Si la cantidad es 0 o negativa, eliminamos el item
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, cantidad: newQuantity } : item
      )
    );
  };

  // Función para limpiar el carrito (ej. después de pagar)
  const clearCart = () => {
    setCartItems([]);
    toast.success('Carrito vaciado');
  };

  // Calculamos el total del carrito
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);

  // El "value" es todo lo que los componentes hijos podrán consumir de este contexto.
  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

// 3. Hook personalizado para usar el contexto de forma más fácil y segura.
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};