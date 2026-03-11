import { Link } from 'react-router-dom';
import Button from '../Atoms/Button';

const NavLink = ({ to, children }) => {
  return (
    <Link to={to}>
      <Button variant="secondary">{children}</Button>
    </Link>
  );
};

export default NavLink;