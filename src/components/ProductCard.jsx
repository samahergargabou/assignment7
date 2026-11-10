import { Link } from 'react-router-dom';

export function ProductCard({ product }) {
  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem', width: '220px', display: 'flex', flexDirection: 'column' }}>
      <img
        src={product.thumbnail}
        alt={product.title}
        style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }}
      />
      <h4 style={{ margin: '0.5rem 0' }}>{product.title}</h4>
      <p style={{ margin: '0.2rem 0', fontWeight: 'bold' }}>${product.price}</p>
      <p style={{ margin: '0.2rem 0', fontSize: '0.85rem', color: '#666' }}>{product.category}</p>
      <Link to={`/products/${product.id}`} style={{ marginTop: 'auto', paddingTop: '0.5rem' }}>
        View Details
      </Link>
    </div>
  );
}