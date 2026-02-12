'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import type { SellerOrderListItemDto } from '@bun-bun/shared';
import { listSellerOrders } from '@/lib/api/sellerOrders';

function StatusBadge({ status, t }: { status: string; t: (key: string) => string }) {
  const colors: Record<string, { bg: string; fg: string }> = {
    PENDING: { bg: '#fff3cd', fg: '#856404' },
    CONFIRMED: { bg: '#d4edda', fg: '#155724' },
    DELIVERED: { bg: '#cce5ff', fg: '#004085' },
    CANCELLED: { bg: '#f8d7da', fg: '#721c24' },
  };
  const c = colors[status] || colors.PENDING;
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

export default function SellerOrdersPage() {
  const t = useTranslations('sellerOrders');
  const tc = useTranslations('common');
  const { user, isLoading: authLoading } = useAuth();

  const [orders, setOrders] = useState<SellerOrderListItemDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isSeller = user?.role === 'SELLER';

  useEffect(() => {
    if (authLoading) return;
    if (!isSeller) return;

    let cancelled = false;
    async function load() {
      try {
        const data = await listSellerOrders();
        if (!cancelled) setOrders(data);
      } catch {
        if (!cancelled) setError(tc('errorGeneric'));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
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

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
      <h1 style={{ marginBottom: '1.5rem' }}>{t('title')}</h1>

      {error && (
        <p
          style={{ color: '#e53e3e', padding: '1rem', background: '#fff5f5', borderRadius: '8px' }}
        >
          {error}
        </p>
      )}

      {loading && <p>{tc('loading')}</p>}

      {!loading && orders.length === 0 && !error && <p style={{ color: '#888' }}>{t('empty')}</p>}

      {orders.length > 0 && (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #eee', textAlign: 'left' }}>
              <th style={{ padding: '0.75rem' }}>{t('buyer')}</th>
              <th style={{ padding: '0.75rem' }}>{t('email')}</th>
              <th style={{ padding: '0.75rem' }}>{t('phone')}</th>
              <th style={{ padding: '0.75rem' }}>{t('createdAt')}</th>
              <th style={{ padding: '0.75rem' }}>{t('status')}</th>
              <th style={{ padding: '0.75rem' }}>{t('itemsCount')}</th>
              <th style={{ padding: '0.75rem' }}>{t('total')}</th>
              <th style={{ padding: '0.75rem' }}></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td style={{ padding: '0.75rem' }}>{o.buyer.name}</td>
                <td style={{ padding: '0.75rem', fontSize: '0.9rem', color: '#555' }}>
                  {o.buyer.email}
                </td>
                <td style={{ padding: '0.75rem', fontSize: '0.9rem', color: '#555' }}>
                  {o.buyer.phone || '—'}
                </td>
                <td style={{ padding: '0.75rem', fontSize: '0.9rem' }}>
                  {new Date(o.createdAt).toLocaleDateString()}
                </td>
                <td style={{ padding: '0.75rem' }}>
                  <StatusBadge status={o.status} t={t} />
                </td>
                <td style={{ padding: '0.75rem', textAlign: 'center' }}>{o.itemsCount}</td>
                <td style={{ padding: '0.75rem', fontWeight: 600 }}>{o.total.toFixed(2)} $</td>
                <td style={{ padding: '0.75rem' }}>
                  <Link
                    href={`/seller/orders/${o.id}`}
                    style={{
                      padding: '0.3rem 0.8rem',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      textDecoration: 'none',
                      fontSize: '0.85rem',
                      color: '#333',
                    }}
                  >
                    {t('open')}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
