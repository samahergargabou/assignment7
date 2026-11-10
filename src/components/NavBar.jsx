import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCartStore } from '../store/cartStore';

export function NavBar({ theme, toggleTheme }) {
  const { user, logoutUser } = useAuth();
  
  // Sélecteur précis : ne recalcule que le total d'articles
  const totalItems = useCartStore((state) =>
    state.items.reduce((acc, item) => acc + item.quantity, 0)
  );

  return (
    <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', borderBottom: '1px solid gray', alignItems: 'center' }}>
      <NavLink to="/" end style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}>
        Home
      </NavLink>
      <NavLink to="/products" style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}>
        Products
      </NavLink>
      <NavLink to="/cart" style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}>
        Cart ({totalItems})
      </NavLink>

      <button onClick={toggleTheme} style={{ marginLeft: 'auto' }}>
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>

      {user ? (
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <span>{user.username}</span>
          <button onClick={logoutUser}>Logout</button>
        </div>
      ) : (
        <NavLink to="/login" style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}>
          Login
        </NavLink>
      )}
    </nav>
  );
}