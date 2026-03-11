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
    primary: 'bg-primary text-light hover:bg-opacity-90', 
    secondary: 'bg-secondary text-dark hover:bg-opacity-90', 
    accent: 'bg-dark text-light hover:bg-opacity-90', 
    warning: 'bg-warning text-dark hover:bg-opacity-90', 
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