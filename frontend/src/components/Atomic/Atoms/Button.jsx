const Button = ({ 
  children,   // El texto o elementos que irán DENTRO del botón (ej. "Inicio")
  onClick,    // La función que se ejecutará al hacer clic
  variant = 'primary', // Una variante para cambiar el color (primary, secondary, accent)
  type = 'button', // El tipo de botón HTML (button, submit, reset)
  className = '' // Clases CSS extra que queramos añadir desde fuera
}) => {
  
  // Estilos base y variantes con Tailwind
  const baseClasses = 'px-4 py-2 rounded-lg font-semibold transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-primary text-light hover:bg-opacity-90', // Fondo oscuro, texto blanco
    secondary: 'bg-secondary text-dark hover:bg-gray-300', // Fondo gris claro, texto oscuro
    accent: 'bg-accent text-secondary hover:bg-opacity-90', // Fondo calipso, texto oscuro
    warning: 'bg-warning text-dark hover:bg-opacity-90', // Fondo mostaza, texto oscuro
  };

  // Combinacion las clases base, la variante seleccionada y las clases extra que nos pasen
  const combinedClassName = `${baseClasses} ${variants[variant]} ${className}`;

  return (
    <button 
      type={type}
      onClick={onClick}
      className={combinedClassName}
    >
      {children}
    </button>
  );
};

export default Button;