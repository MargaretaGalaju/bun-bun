'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { ProductDto } from '@bun-bun/shared';
import { getPublicProduct } from '@/lib/api/products';

export default function ProductDetailPage() {
  const t = useTranslations('products');
  const params = useParams();
  const id = params.id as string;

  const [product, setProduct] = useState<ProductDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const data = await getPublicProduct(id);
        if (!cancelled) setProduct(data);
      } catch {
        if (!cancelled) setError(t('notFound'));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [id, t]);

  if (loading) return <p>{t('empty')}</p>;
  if (error || !product) {
    return (
      <div>
        <Link href="/products" style={{ color: '#555' }}>{t('backToCatalog')}</Link>
        <p style={{ marginTop: '1rem', color: '#e53e3e' }}>{error || t('notFound')}</p>
      </div>
    );
  }

  return (
    <div>
      <Link href="/products" style={{ color: '#555', textDecoration: 'none' }}>
        {t('backToCatalog')}
      </Link>

      <h1 style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>{product.title}</h1>

      {product.city && (
        <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{product.city}</p>
      )}

      <p
        style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#2d6a4f',
          marginBottom: '1rem',
        }}
      >
        {t('price', { price: product.price.toFixed(2) })}
      </p>

      {/* Images */}
      {product.images && product.images.length > 0 && (
        <div
          style={{
            display: 'flex',
            gap: '0.75rem',
            overflowX: 'auto',
            marginBottom: '1.5rem',
            paddingBottom: '0.5rem',
          }}
        >
          {product.images.map((img) => (
            <img
              key={img.id}
              src={img.url}
              alt={product.title}
              style={{
                width: '280px',
                height: '200px',
                objectFit: 'cover',
                borderRadius: '8px',
                flexShrink: 0,
              }}
            />
          ))}
        </div>
      )}

      <h3>{t('description')}</h3>
      <p style={{ lineHeight: 1.6, color: '#444', whiteSpace: 'pre-wrap' }}>
        {product.description}
      </p>
    </div>
  );
}
