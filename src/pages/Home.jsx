import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Welcome to Our Store</h1>
      <p>Explore our catalog with real-time filtering, client routing, and persisted cart.</p>
      <Link to="/products" style={{ display: 'inline-block', marginTop: '1rem', padding: '0.6rem 1.2rem', backgroundColor: '#007bff', color: '#fff', textDecoration: 'none', borderRadius: '4px' }}>
        Browse Products
      </Link>
    </div>
  );
}