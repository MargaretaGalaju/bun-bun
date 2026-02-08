'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import type { ProductDto } from '@bun-bun/shared';
import { listMySellerProducts, setSellerProductStatus } from '@/lib/api/products';

function StatusBadge({ status, t }: { status: string; t: (key: string) => string }) {
  const colors: Record<string, { bg: string; fg: string }> = {
    ACTIVE: { bg: '#d4edda', fg: '#155724' },
    DRAFT: { bg: '#fff3cd', fg: '#856404' },
    HIDDEN: { bg: '#e2e3e5', fg: '#383d41' },
  };
  const c = colors[status] || colors.DRAFT;
  const labelKey = `status${status.charAt(0) + status.slice(1).toLowerCase()}`;
  return (
    <span
      style={{
        padding: '0.2rem 0.6rem',
        borderRadius: '12px',
        fontSize: '0.8rem',
        fontWeight: 600,
        background: c.bg,
        color: c.fg,
      }}
    >
      {t(labelKey)}
    </span>
  );
}

export default function SellerProductsPage() {
  const t = useTranslations('seller.products');
  const tc = useTranslations('common');
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [products, setProducts] = useState<ProductDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isSeller = user?.role === 'SELLER';

  useEffect(() => {
    if (authLoading) return;
    if (!isSeller) return;

    let cancelled = false;
    async function load() {
      try {
        const data = await listMySellerProducts();
        if (!cancelled) setProducts(data);
      } catch {
        if (!cancelled) setError(tc('errorGeneric'));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [authLoading, isSeller, tc]);

  if (authLoading) return <p>{tc('loading')}</p>;

  if (!isSeller) {
    return (
      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <p style={{ fontSize: '1.1rem', color: '#666' }}>{t('accessRequired')}</p>
        <Link
          href="/login"
          style={{
            display: 'inline-block',
            marginTop: '1rem',
            padding: '0.5rem 1.5rem',
            background: '#333',
            color: '#fff',
            borderRadius: '6px',
            textDecoration: 'none',
          }}
        >
          {tc('error401')}
        </Link>
      </div>
    );
  }

  async function toggleStatus(product: ProductDto) {
    const newStatus = product.status === 'ACTIVE' ? 'HIDDEN' : 'ACTIVE';
    try {
      const updated = await setSellerProductStatus(product.id, newStatus);
      setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    } catch {
      alert(tc('errorGeneric'));
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1>{t('title')}</h1>
        <Link
          href="/seller/products/new"
          style={{
            padding: '0.5rem 1.2rem',
            background: '#2d6a4f',
            color: '#fff',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          + {t('create')}
        </Link>
      </div>

      {error && (
        <p style={{ color: '#e53e3e', padding: '1rem', background: '#fff5f5', borderRadius: '8px' }}>
          {error}
        </p>
      )}

      {loading && <p>{tc('loading')}</p>}

      {!loading && products.length === 0 && !error && (
        <p style={{ color: '#888' }}>{t('noProducts')}</p>
      )}

      {products.length > 0 && (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #eee', textAlign: 'left' }}>
              <th style={{ padding: '0.75rem' }}>{t('titleField')}</th>
              <th style={{ padding: '0.75rem' }}>{t('priceField')}</th>
              <th style={{ padding: '0.75rem' }}>Status</th>
              <th style={{ padding: '0.75rem' }}></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td style={{ padding: '0.75rem' }}>{p.title}</td>
                <td style={{ padding: '0.75rem' }}>{p.price.toFixed(2)} $</td>
                <td style={{ padding: '0.75rem' }}>
                  <StatusBadge status={p.status} t={t} />
                </td>
                <td style={{ padding: '0.75rem', display: 'flex', gap: '0.5rem' }}>
                  <Link
                    href={`/seller/products/${p.id}/edit`}
                    style={{
                      padding: '0.3rem 0.8rem',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      textDecoration: 'none',
                      fontSize: '0.85rem',
                      color: '#333',
                    }}
                  >
                    {t('edit')}
                  </Link>
                  <button
                    onClick={() => toggleStatus(p)}
                    style={{
                      padding: '0.3rem 0.8rem',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      background: p.status === 'ACTIVE' ? '#fff3cd' : '#d4edda',
                    }}
                  >
                    {p.status === 'ACTIVE' ? t('hide') : t('publish')}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
