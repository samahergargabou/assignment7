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

  if (loading) return <p>Loading products catalogue...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  if (!products) return null;

  // Categories derivees dynamiquement
  const categories = ['all', ...new Set(products.map((p) => p.category))];

  // Filtrage derive directement dans le render (sans useState)
  const filteredProducts = products.filter((product) => {
    const matchesQuery = product.title.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesQuery && matchesCategory;
  });

  return (
    <div>
      <h2>Products</h2>

      {/* Barre de filtres */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search by title..."
          value={query}
          onChange={(e) => updateParam('q', e.target.value)}
          style={{ padding: '0.5rem', minWidth: '220px' }}
        />

        <select
          value={selectedCategory}
          onChange={(e) => updateParam('category', e.target.value)}
          style={{ padding: '0.5rem' }}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {/* Etat vide */}
      {filteredProducts.length === 0 ? (
        <p>No products match your search criteria.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}