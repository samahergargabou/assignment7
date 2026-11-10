import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';

export function ProductCard({ product }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: 'var(--bg-card)',
        borderRadius: 'var(--radius)',
        border: '1px solid var(--border)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-sm)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
      }}
    >
      <div style={{ height: '180px', backgroundColor: '#f1f5f9', overflow: 'hidden' }}>
        <img
          src={product.thumbnail}
          alt={product.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          loading="lazy"
        />
      </div>

      <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <span
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            color: 'var(--primary)',
            letterSpacing: '0.05em'
          }}
        >
          {product.category}
        </span>

        <h3
          style={{
            fontSize: '1rem',
            margin: '0.35rem 0',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {product.title}
        </h3>

        <p style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0.5rem 0' }}>
          ${product.price}
        </p>

        <div style={{ marginTop: 'auto', display: 'flex', gap: '0.5rem', paddingTop: '0.75rem' }}>
          <Link
            to={`/products/${product.id}`}
            style={{
              flex: 1,
              textAlign: 'center',
              padding: '0.55rem',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--bg-main)',
              color: 'var(--text-main)',
              textDecoration: 'none',
              fontWeight: 500,
              fontSize: '0.9rem'
            }}
          >
            Details
          </Link>

          <button
            onClick={() => addItem(product)}
            style={{
              flex: 1,
              backgroundColor: 'var(--primary)',
              color: '#ffffff',
              border: 'none',
              fontWeight: 600,
              fontSize: '0.9rem'
            }}
          >
            Add +
          </button>
        </div>
      </div>
    </div>
  );
}