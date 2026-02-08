'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import type { OrderGroupDto } from '@bun-bun/shared';
import { getMyOrders } from '@/lib/api/orders';

function GroupStatusBadge({ status, t }: { status: string; t: (key: string) => string }) {
  const colors: Record<string, { bg: string; fg: string }> = {
    NEW: { bg: '#cce5ff', fg: '#004085' },
    COMPLETED: { bg: '#d4edda', fg: '#155724' },
    CANCELLED: { bg: '#f8d7da', fg: '#721c24' },
  };
  const c = colors[status] || colors.NEW;
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
      {t(`status${status.charAt(0) + status.slice(1).toLowerCase()}`)}
    </span>
  );
}

function OrderStatusBadge({ status, t }: { status: string; t: (key: string) => string }) {
  const key = `orderStatus${status.charAt(0) + status.slice(1).toLowerCase()}`;
  return (
    <span
      style={{
        padding: '0.15rem 0.5rem',
        borderRadius: '10px',
        fontSize: '0.75rem',
        fontWeight: 500,
        background: '#e2e3e5',
        color: '#383d41',
      }}
    >
      {t(key)}
    </span>
  );
}

export default function OrdersPage() {
  const t = useTranslations('orders');
  const tc = useTranslations('common');
  const { user, isLoading: authLoading } = useAuth();
  const searchParams = useSearchParams();
  const isSuccess = searchParams.get('success') === '1';

  const [orders, setOrders] = useState<OrderGroupDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isBuyer = user?.role === 'BUYER';

  useEffect(() => {
    if (authLoading) return;
    if (!isBuyer) return;

    let cancelled = false;
    async function load() {
      try {
        const data = await getMyOrders();
        if (!cancelled) setOrders(data);
      } catch {
        if (!cancelled) setError(tc('errorGeneric'));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [authLoading, isBuyer, tc]);

  if (authLoading) return <p>{tc('loading')}</p>;

  if (!isBuyer) {
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
    <div>
      <h1 style={{ marginBottom: '1rem' }}>{t('title')}</h1>

      {isSuccess && (
        <div
          style={{
            padding: '0.75rem 1rem',
            background: '#d4edda',
            color: '#155724',
            borderRadius: '6px',
            marginBottom: '1.5rem',
            fontWeight: 500,
          }}
        >
          {t('successMessage')}
        </div>
      )}

      {error && (
        <p style={{ color: '#e53e3e', padding: '1rem', background: '#fff5f5', borderRadius: '8px' }}>
          {error}
        </p>
      )}

      {loading && <p>{tc('loading')}</p>}

      {!loading && orders.length === 0 && !error && (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <p style={{ color: '#888' }}>{t('empty')}</p>
          <Link
            href="/products"
            style={{
              display: 'inline-block',
              marginTop: '1rem',
              padding: '0.5rem 1.5rem',
              background: '#2d6a4f',
              color: '#fff',
              borderRadius: '6px',
              textDecoration: 'none',
            }}
          >
            {t('browseProducts')}
          </Link>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {orders.map((group) => (
          <div
            key={group.id}
            style={{
              border: '1px solid #eee',
              borderRadius: '8px',
              padding: '1.5rem',
            }}
          >
            {/* Group header */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem',
                flexWrap: 'wrap',
                gap: '0.5rem',
              }}
            >
              <div>
                <span style={{ fontWeight: 600 }}>{t('orderGroup')}</span>
                <span style={{ color: '#888', fontSize: '0.85rem', marginLeft: '0.75rem' }}>
                  {new Date(group.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <GroupStatusBadge status={group.status} t={t} />
                <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>
                  {t('total')}: {group.total.toFixed(2)} $
                </span>
              </div>
            </div>

            {/* Orders per seller */}
            {group.orders.map((order) => (
              <div
                key={order.id}
                style={{
                  background: '#f9f9f9',
                  borderRadius: '6px',
                  padding: '1rem',
                  marginBottom: '0.75rem',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.5rem',
                  }}
                >
                  <span style={{ fontSize: '0.85rem', color: '#666' }}>
                    {t('seller')}: {order.sellerId.slice(0, 8)}...
                  </span>
                  <OrderStatusBadge status={order.status} t={t} />
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #e0e0e0', textAlign: 'left' }}>
                      <th style={{ padding: '0.4rem', fontSize: '0.85rem' }}>{t('items')}</th>
                      <th style={{ padding: '0.4rem', fontSize: '0.85rem' }}>{t('qty')}</th>
                      <th style={{ padding: '0.4rem', fontSize: '0.85rem' }}>{t('price')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item) => (
                      <tr key={item.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                        <td style={{ padding: '0.4rem', fontSize: '0.9rem' }}>{item.productTitle}</td>
                        <td style={{ padding: '0.4rem', fontSize: '0.9rem' }}>{item.qty}</td>
                        <td style={{ padding: '0.4rem', fontSize: '0.9rem' }}>{item.priceSnapshot.toFixed(2)} $</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <p style={{ textAlign: 'right', fontWeight: 600, marginTop: '0.5rem', fontSize: '0.9rem' }}>
                  {t('orderTotal')}: {order.total.toFixed(2)} $
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
