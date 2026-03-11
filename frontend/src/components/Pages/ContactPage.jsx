import { useState } from 'react';
import Breadcrumbs from '../Atomic/Molecules/Breadcrumbs';
import Button from '../Atomic/Atoms/Button';
import Input from '../Atomic/Atoms/Input';
import { toast } from 'react-hot-toast';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

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

      {/* Header divertido */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-dark mb-4">
          ¡Hablemos! <span className="text-primary">⚡</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          ¿Tienes dudas? ¿Quieres agendar una clase? ¡Escríbenos!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Información de contacto - Columnas 1 */}
        <div className="lg:col-span-1 space-y-6">
          {/* Tarjeta de ubicación */}
          <div className="bg-gradient-to-br from-primary to-accent3 p-6 rounded-lg text-white">
            <h2 className="text-2xl font-bold mb-4">📍 Visítanos</h2>
            <p className="mb-2">Av. Patinaje 1234</p>
            <p>Santiago, Chile</p>
          </div>

          {/* Tarjetas de contacto */}
          <div className="bg-accent2 bg-opacity-20 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <FaPhone className="text-primary text-xl" />
              <div>
                <p className="font-semibold">Teléfono</p>
                <p>+56 9 1234 5678</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 mb-4">
              <FaEnvelope className="text-primary text-xl" />
              <div>
                <p className="font-semibold">Email</p>
                <p>hola@escuelapatina.cl</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <FaClock className="text-primary text-xl" />
              <div>
                <p className="font-semibold">Horario</p>
                <p>Lun - Vie: 9:00 - 20:00</p>
                <p>Sáb: 10:00 - 18:00</p>
              </div>
            </div>
          </div>

          {/* Redes sociales divertidas */}
          <div className="bg-accent p-6 rounded-lg text-dark">
            <h3 className="text-xl font-bold mb-3">¡Síguenos!</h3>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer">
                <span className="text-xl">📷</span>
              </div>
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer">
                <span className="text-xl">📘</span>
              </div>
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer">
                <span className="text-xl">🐦</span>
              </div>
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer">
                <span className="text-xl">🎥</span>
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
                variant="primary"
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