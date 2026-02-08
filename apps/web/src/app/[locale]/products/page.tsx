'use client';

import { useEffect, useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { ProductDto } from '@bun-bun/shared';
import { listPublicProducts, type PublicProductParams } from '@/lib/api/products';

export default function ProductsPage() {
  const t = useTranslations('products');
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [q, setQ] = useState('');
  const [city, setCity] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sort, setSort] = useState<PublicProductParams['sort']>('newest');

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params: PublicProductParams = { sort };
      if (q.trim()) params.q = q.trim();
      if (city.trim()) params.city = city.trim();
      if (minPrice) params.minPrice = parseFloat(minPrice);
      if (maxPrice) params.maxPrice = parseFloat(maxPrice);
      const data = await listPublicProducts(params);
      setProducts(data);
    } catch {
      setError(t('loadError'));
    } finally {
      setLoading(false);
    }
  }, [q, city, minPrice, maxPrice, sort, t]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const inputStyle = {
    padding: '0.5rem',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '0.9rem',
  };

  return (
    <div>
      <h1 style={{ marginBottom: '1rem' }}>{t('title')}</h1>

      {/* Filter bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.75rem',
          marginBottom: '1.5rem',
          padding: '1rem',
          background: '#f9f9f9',
          borderRadius: '8px',
        }}
      >
        <input
          type="text"
          placeholder={t('search')}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          style={{ ...inputStyle, flex: '1 1 200px' }}
        />
        <input
          type="text"
          placeholder={t('city')}
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{ ...inputStyle, width: '140px' }}
        />
        <input
          type="number"
          placeholder={t('minPrice')}
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          style={{ ...inputStyle, width: '110px' }}
          min={0}
        />
        <input
          type="number"
          placeholder={t('maxPrice')}
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          style={{ ...inputStyle, width: '110px' }}
          min={0}
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as PublicProductParams['sort'])}
          style={{ ...inputStyle, width: '140px' }}
        >
          <option value="newest">{t('sortNewest')}</option>
          <option value="price_asc">{t('sortPriceAsc')}</option>
          <option value="price_desc">{t('sortPriceDesc')}</option>
        </select>
      </div>

      {loading && <p>{t('empty')}</p>}
      {error && (
        <p style={{ color: '#e53e3e', padding: '1rem', background: '#fff5f5', borderRadius: '8px' }}>
          {error}
        </p>
      )}

      {!loading && !error && products.length === 0 && <p>{t('empty')}</p>}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div
              style={{
                border: '1px solid #eee',
                borderRadius: '8px',
                overflow: 'hidden',
                transition: 'box-shadow 0.2s',
                cursor: 'pointer',
              }}
            >
              {product.images && product.images.length > 0 ? (
                <div
                  style={{
                    height: '180px',
                    background: `url(${product.images[0].url}) center/cover no-repeat`,
                    backgroundColor: '#f0f0f0',
                  }}
                />
              ) : (
                <div
                  style={{
                    height: '180px',
                    background: '#f0f0f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#999',
                    fontSize: '0.9rem',
                  }}
                >
                  {t('noImage')}
                </div>
              )}
              <div style={{ padding: '1rem' }}>
                <h2 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{product.title}</h2>
                {product.city && (
                  <p style={{ color: '#888', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
                    {product.city}
                  </p>
                )}
                <p style={{ fontWeight: 'bold', color: '#2d6a4f' }}>
                  {t('price', { price: product.price.toFixed(2) })}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
