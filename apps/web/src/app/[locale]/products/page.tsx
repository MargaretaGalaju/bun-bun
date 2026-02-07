import { getTranslations } from 'next-intl/server';
import { getProducts } from '@/lib/api/products';
import type { ProductDto } from '@bun-bun/shared';

export default async function ProductsPage() {
  const t = await getTranslations('products');
  let products: ProductDto[] = [];
  let error: string | null = null;

  try {
    products = await getProducts();
  } catch {
    error = t('loadError');
  }

  return (
    <div>
      <h1>{t('title')}</h1>
      {error && (
        <p style={{ color: '#e53e3e', padding: '1rem', background: '#fff5f5', borderRadius: '8px' }}>
          {error}
        </p>
      )}
      {products.length === 0 && !error && <p>{t('empty')}</p>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: '1px solid #eee',
              borderRadius: '8px',
              padding: '1.5rem',
            }}
          >
            <h2 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{product.title}</h2>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>{product.description}</p>
            <p style={{ fontWeight: 'bold', marginTop: '0.75rem' }}>
              {t('price', { price: product.price.toFixed(2) })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
