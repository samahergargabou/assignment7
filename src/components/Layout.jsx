import { Outlet } from 'react-router-dom';
import { NavBar } from './NavBar';
import { useLocalStorage } from '../hooks/useLocalStorage';

export function Layout() {
  const [theme, setTheme] = useLocalStorage('app-theme', 'light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const themeStyles = {
    backgroundColor: theme === 'light' ? '#ffffff' : '#1a1a1a',
    color: theme === 'light' ? '#111111' : '#f5f5f5',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  };

  return (
    <div style={themeStyles}>
      <NavBar theme={theme} toggleTheme={toggleTheme} />
      <main style={{ flex: 1, padding: '1rem' }}>
        <Outlet />
      </main>
      <footer style={{ padding: '1rem', borderTop: '1px solid gray', textAlign: 'center' }}>
        <p>© 2026 Online Shop - Assignment 7</p>
      </footer>
    </div>
  );
}