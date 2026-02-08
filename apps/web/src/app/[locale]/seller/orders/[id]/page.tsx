'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import type { SellerOrderDetailsDto } from '@bun-bun/shared';
import { getSellerOrder, updateSellerOrderStatus } from '@/lib/api/sellerOrders';

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
        fontSize: '0.85rem',
        fontWeight: 600,
        background: c.bg,
        color: c.fg,
      }}
    >
      {t(labelKey)}
    </span>
  );
}

export default function SellerOrderDetailPage() {
  const t = useTranslations('sellerOrders');
  const tc = useTranslations('common');
  const { user, isLoading: authLoading } = useAuth();
  const params = useParams();
  const orderId = params?.id as string;

  const [order, setOrder] = useState<SellerOrderDetailsDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const isSeller = user?.role === 'SELLER';

  useEffect(() => {
    if (authLoading) return;
    if (!isSeller || !orderId) return;

    let cancelled = false;
    async function load() {
      try {
        const data = await getSellerOrder(orderId);
        if (!cancelled) setOrder(data);
      } catch {
        if (!cancelled) setError(tc('errorGeneric'));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [authLoading, isSeller, orderId, tc]);

  async function handleStatusChange(newStatus: string) {
    if (!orderId) return;
    setUpdating(true);
    setSuccessMsg(null);
    setError(null);
    try {
      const updated = await updateSellerOrderStatus(orderId, newStatus);
      setOrder(updated);
      setSuccessMsg(t('statusUpdated'));
    } catch {
      setError(t('updateFailed'));
    } finally {
      setUpdating(false);
    }
  }

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

  if (loading) return <p>{tc('loading')}</p>;

  if (error && !order) {
    return <p style={{ color: '#e53e3e' }}>{error}</p>;
  }

  if (!order) return <p>{tc('errorGeneric')}</p>;

  return (
    <div>
      <Link
        href="/seller/orders"
        style={{ display: 'inline-block', marginBottom: '1rem', color: '#555', textDecoration: 'none' }}
      >
        {t('backToList')}
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <h1 style={{ margin: 0 }}>{t('title')} #{order.id.slice(0, 8)}</h1>
        <StatusBadge status={order.status} t={t} />
      </div>

      {successMsg && (
        <p style={{ color: '#155724', background: '#d4edda', padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1rem' }}>
          {successMsg}
        </p>
      )}
      {error && order && (
        <p style={{ color: '#e53e3e', background: '#fff5f5', padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1rem' }}>
          {error}
        </p>
      )}

      {/* Buyer info */}
      <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
        <p style={{ margin: '0.25rem 0' }}>
          <strong>{t('buyer')}:</strong> {order.buyer.name}
        </p>
        <p style={{ margin: '0.25rem 0' }}>
          <strong>{t('email')}:</strong> {order.buyer.email}
        </p>
        {order.buyer.phone && (
          <p style={{ margin: '0.25rem 0' }}>
            <strong>{t('phone')}:</strong> {order.buyer.phone}
          </p>
        )}
        <p style={{ margin: '0.25rem 0' }}>
          <strong>{t('createdAt')}:</strong> {new Date(order.createdAt).toLocaleString()}
        </p>
      </div>

      {/* Items table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #eee', textAlign: 'left' }}>
            <th style={{ padding: '0.75rem' }}>{t('product')}</th>
            <th style={{ padding: '0.75rem' }}>{t('qty')}</th>
            <th style={{ padding: '0.75rem' }}>{t('price')}</th>
            <th style={{ padding: '0.75rem' }}>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item) => (
            <tr key={item.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
              <td style={{ padding: '0.75rem' }}>{item.productTitle}</td>
              <td style={{ padding: '0.75rem' }}>{item.qty}</td>
              <td style={{ padding: '0.75rem' }}>{item.priceSnapshot.toFixed(2)} $</td>
              <td style={{ padding: '0.75rem', fontWeight: 600 }}>
                {(item.qty * item.priceSnapshot).toFixed(2)} $
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p style={{ fontSize: '1.2rem', fontWeight: 700 }}>
        {t('total')}: {order.total.toFixed(2)} $
      </p>

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
        {order.status === 'PENDING' && (
          <>
            <button
              disabled={updating}
              onClick={() => handleStatusChange('CONFIRMED')}
              style={{
                padding: '0.5rem 1.5rem',
                background: '#2d6a4f',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: updating ? 'not-allowed' : 'pointer',
                fontWeight: 600,
                opacity: updating ? 0.6 : 1,
              }}
            >
              {t('accept')}
            </button>
            <button
              disabled={updating}
              onClick={() => handleStatusChange('CANCELLED')}
              style={{
                padding: '0.5rem 1.5rem',
                background: '#dc3545',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: updating ? 'not-allowed' : 'pointer',
                fontWeight: 600,
                opacity: updating ? 0.6 : 1,
              }}
            >
              {t('reject')}
            </button>
          </>
        )}
        {order.status === 'CONFIRMED' && (
          <button
            disabled={updating}
            onClick={() => handleStatusChange('DELIVERED')}
            style={{
              padding: '0.5rem 1.5rem',
              background: '#0069d9',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: updating ? 'not-allowed' : 'pointer',
              fontWeight: 600,
              opacity: updating ? 0.6 : 1,
            }}
          >
            {t('done')}
          </button>
        )}
      </div>
    </div>
  );
}
