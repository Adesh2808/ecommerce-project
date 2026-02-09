import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useCart } from '../CartContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)', color: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <Link to="/home" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Ecommerce</Link>
      <div>
        {user ? (
          <>
            <Link to="/home" style={{ color: 'white', marginRight: '1rem' }}>Home</Link>
            <Link to="/products" style={{ color: 'white', marginRight: '1rem' }}>Products</Link>
            <Link to="/saved" style={{ color: 'white', marginRight: '1rem' }}>Saved</Link>
            <Link to="/cart" style={{ color: 'white', marginRight: '1rem' }}>Cart ({cart.length})</Link>
            <button onClick={logout} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>Logout</button>
          </>
        ) : (
          <Link to="/login" style={{ color: 'white' }}>Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;