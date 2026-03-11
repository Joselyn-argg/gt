const Input = ({
  type = 'text',
  id,
  name,
  value,
  onChange,
  placeholder = '',
  required = false,
  min, // Para inputs numéricos
  className = ''
}) => {
  return (
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      min={min}
      className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent ${className}`}
    />
  );
};

export default Input;