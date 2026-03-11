import { useNavigate } from 'react-router-dom';
import Button from './Button';

const BackButton = ({ className = '' }) => {
  const navigate = useNavigate();

  return (
    <Button 
      onClick={() => navigate(-1)} 
      variant="secondary"
      className={className}
    >
      ← Atrás
    </Button>
  );
};

export default BackButton;