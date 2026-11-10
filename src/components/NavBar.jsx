import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCartStore } from '../store/cartStore';

export function NavBar({ theme, toggleTheme }) {
  const { user, logoutUser } = useAuth();
  const totalCount = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  const navLinkStyle = ({ isActive }) => ({
    padding: '0.5rem 0.85rem',
    borderRadius: '6px',
    color: isActive ? '#fff' : 'var(--text-main)',
    backgroundColor: isActive ? 'var(--primary)' : 'transparent',
    fontWeight: isActive ? 600 : 500,
    textDecoration: 'none',
    transition: 'all 0.15s ease'
  });

  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.85rem 2rem',
        borderBottom: '1px solid var(--border)',
        backgroundColor: 'var(--bg-card)',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ fontWeight: 800, fontSize: '1.15rem', color: 'var(--primary)' }}>
          ShopApp
        </span>
        <NavLink to="/" style={navLinkStyle}>Home</NavLink>
        <NavLink to="/products" style={navLinkStyle}>Products</NavLink>
        <NavLink to="/cart" style={navLinkStyle}>
          Cart ({totalCount})
        </NavLink>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          onClick={toggleTheme}
          style={{
            padding: '0.45rem 0.85rem',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            backgroundColor: 'var(--bg-main)',
            color: 'var(--text-main)',
            fontWeight: 500
          }}
        >
          {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
        </button>

        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              {user.name || user.username}
            </span>
            <button
              onClick={logoutUser}
              style={{
                padding: '0.45rem 0.85rem',
                border: 'none',
                borderRadius: '6px',
                backgroundColor: 'var(--danger)',
                color: '#fff',
                fontWeight: 600
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <NavLink to="/login" style={navLinkStyle}>
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
}