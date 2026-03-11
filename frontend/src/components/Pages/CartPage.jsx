import { useCart } from '../../context/CartContext';
import Button from '../Atomic/Atoms/Button';
import BackButton from '../Atomic/Atoms/BackButton';
import { toast } from 'react-hot-toast';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  const handleCheckout = () => {
    // Simular proceso de pago
    toast.success('Hemos enviado a tu correo el link de pago');
    // Aquí iría la lógica real de pago
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-dark mb-4">Tu carrito está vacío</h2>
        <p className="text-gray-600 mb-6">Agrega algunas clases para comenzar</p>
        <BackButton />
      </div>
    );
  }

  return (
    <div>
      <BackButton className="mb-4" />
      <h1 className="text-3xl font-bold text-dark mb-6">Tu Carrito</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lista de items */}
        <div className="lg:col-span-2">
          {cartItems.map(item => (
            <div key={item.id} className="flex items-center gap-4 border-b py-4">
              <img 
                src={item.imagen || '/placeholder.jpg'} 
                alt={item.nombre}
                className="w-24 h-24 object-cover rounded"
              />
              
              <div className="flex-grow">
                <h3 className="font-semibold">{item.nombre}</h3>
                <p className="text-accent font-bold">${item.precio?.toLocaleString()}</p>
                
                <div className="flex items-center gap-2 mt-2">
                  <label className="text-sm">Cantidad:</label>
                  <input
                    type="number"
                    min="1"
                    value={item.cantidad}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    className="w-16 px-2 py-1 border rounded"
                  />
                  
                  <Button 
                    onClick={() => removeFromCart(item.id)}
                    variant="warning"
                    className="ml-4"
                  >
                    Eliminar
                  </Button>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-bold">
                  ${(item.precio * item.cantidad)?.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Resumen */}
        <div className="bg-secondary p-6 rounded-lg h-fit">
          <h2 className="text-xl font-bold mb-4">Resumen</h2>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${cartTotal?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t">
              <span>Total:</span>
              <span>${cartTotal?.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <Button 
              onClick={handleCheckout}
              variant="accent"
              className="w-full"
            >
              Procesar Pago
            </Button>
            
            <Button 
              onClick={clearCart}
              variant="secondary"
              className="w-full"
            >
              Vaciar Carrito
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;