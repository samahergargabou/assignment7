import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchProducts } from '../api/productsApi';
import { useFetch } from '../hooks/useFetch';
import { ProductCard } from '../components/ProductCard';

export function ProductList() {
  const fetchProductsCallback = useCallback((signal) => fetchProducts(signal), []);
  const { data: products, loading, error } = useFetch(fetchProductsCallback, [fetchProductsCallback]);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('q') || '';
  const selectedCategory = searchParams.get('category') || 'all';

  const updateParam = (key, value) => {
    const nextParams = new URLSearchParams(searchParams);
    if (value && value !== 'all') {
      nextParams.set(key, value);
    } else {
      nextParams.delete(key);
    }
    setSearchParams(nextParams);
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
        <p>Loading catalog items...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '1.5rem', border: '1px solid var(--danger)', borderRadius: 'var(--radius)', color: 'var(--danger)' }}>
        Failed to load catalog: {error}
      </div>
    );
  }

  if (!products) return null;

  const categories = ['all', ...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter((product) => {
    const matchesQuery = product.title.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesQuery && matchesCategory;
  });

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          Explore Products
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Filter products by category or search instantly.
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          marginBottom: '2rem',
          padding: '1rem',
          backgroundColor: 'var(--bg-card)',
          borderRadius: 'var(--radius)',
          border: '1px solid var(--border)'
        }}
      >
        <input
          type="text"
          placeholder="Search items by name..."
          value={query}
          onChange={(e) => updateParam('q', e.target.value)}
          style={{ flex: '1', minWidth: '240px' }}
        />

        <select
          value={selectedCategory}
          onChange={(e) => updateParam('category', e.target.value)}
          style={{ minWidth: '180px' }}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>
          <p>No products match your search criteria.</p>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '1.5rem'
          }}
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}