import { useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProduct } from '../api/productsApi';
import { useFetch } from '../hooks/useFetch';
import { useCartStore } from '../store/cartStore';

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  
  const addItem = useCartStore((state) => state.addItem);

  const fetchCallback = useCallback(
    (signal) => fetchProduct(id, signal),
    [id]
  );

  const { data: product, loading, error } = useFetch(fetchCallback, [fetchCallback]);

  if (loading) return <p>Loading product details...</p>;
  if (error) {
    return (
      <div style={{ padding: '1rem', border: '1px solid red', borderRadius: '4px' }}>
        <h3>Product Not Found</h3>
        <p>{error}</p>
        <button onClick={() => navigate('/products')}>Back to Products</button>
      </div>
    );
  }
  if (!product) return null;

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '1rem' }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: '1rem' }}>
        ← Back
      </button>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        <img
          src={product.thumbnail}
          alt={product.title}
          style={{ width: '250px', height: '250px', objectFit: 'cover', borderRadius: '8px' }}
        />
        <div style={{ flex: 1 }}>
          <h2>{product.title}</h2>
          <p style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>${product.price}</p>
          <p style={{ color: '#666' }}>Category: {product.category}</p>
          <p>{product.description}</p>
          
          <button
            onClick={() => addItem(product)}
            style={{
              padding: '0.6rem 1.2rem',
              backgroundColor: '#28a745',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '1rem'
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}