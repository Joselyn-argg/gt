import { useState } from 'react';
import Breadcrumbs from '../Atomic/Molecules/Breadcrumbs';
import Button from '../Atomic/Atoms/Button';
import Input from '../Atomic/Atoms/Input';
import { toast } from 'react-hot-toast';
import { FaInstagram, FaWhatsapp, FaClock } from 'react-icons/fa';

const ContactPage = () => {
  // Estado del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  });

  // Estado de envío
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Manejar cambios en inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular envío
    setTimeout(() => {
      toast.success('¡Mensaje enviado! Te responderemos pronto.');
      setFormData({ nombre: '', email: '', asunto: '', mensaje: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div>
      <Breadcrumbs />
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-dark mb-4">
          ¡Hablemos! <span className="text-primary">⚡</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          ¿Tienes dudas? ¿Quieres agendar una clase? ¡Escríbenos!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Información de contacto - Columna 1 */}
        <div className="lg:col-span-1">
          <div className="bg-accent2 bg-opacity-20 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <FaInstagram className="text-dark text-xl" />
              <div>
                <p className="font-semibold">Instagram</p>
                <a 
                  href="https://instagram.com/escuelagatonegro" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent3 transition-colors"
                >
                  @escuelagatonegro
                </a>
              </div>
            </div>
            
            <div className="flex items-center gap-3 mb-4">
              <FaWhatsapp className="text-dark text-xl" />
              <div>
                <p className="font-semibold">Whatsapp</p>
                <a 
                  href="https://wa.me/56947614738" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent3 transition-colors"
                >
                  +56 9 4761 4738
                </a>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <FaClock className="text-dark text-xl" />
              <div>
                <p className="font-semibold">Horarios a coordinar</p>
              </div>
            </div>
          </div>
        </div>

        {/* Formulario de contacto - Columnas 2 */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-light p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-dark mb-6">Envíanos un mensaje</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-dark mb-2">
                  Nombre completo *
                </label>
                <Input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  placeholder="Ej: Ana García"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-dark mb-2">
                  Email *
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="ana@email.com"
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="asunto" className="block text-sm font-medium text-dark mb-2">
                Asunto *
              </label>
              <Input
                type="text"
                id="asunto"
                name="asunto"
                value={formData.asunto}
                onChange={handleChange}
                required
                placeholder="¿En qué podemos ayudarte?"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="mensaje" className="block text-sm font-medium text-dark mb-2">
                Mensaje *
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="Escribe tu mensaje aquí..."
              />
            </div>

            <div className="flex justify-end">
              <Button 
                type="submit" 
                variant="accent"
                disabled={isSubmitting}
                className="px-8"
              >
                {isSubmitting ? 'Enviando... ✨' : 'Enviar mensaje ✨'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;