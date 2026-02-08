'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import { useCart } from '@/features/cart/CartContext';
import { checkout } from '@/lib/api/orders';
import { ApiError } from '@/lib/api/client';

export default function CartPage() {
  const t = useTranslations('cart');
  const tc = useTranslations('common');
  const { user, isLoading: authLoading } = useAuth();
  const { itemList, itemCount, total, removeItem, setQty, clearCart } = useCart();
  const router = useRouter();

  const [checkingOut, setCheckingOut] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isBuyer = user?.role === 'BUYER';

  async function handleCheckout() {
    if (checkingOut || itemList.length === 0) return;
    setError(null);
    setCheckingOut(true);

    try {
      const payload = itemList.map((item) => ({
        productId: item.productId,
        qty: item.qty,
      }));
      await checkout(payload);
      clearCart();
      router.push('/orders?success=1');
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 401 || err.status === 403) {
          router.push('/login');
          return;
        }
        const body = err.body as { message?: string | string[] } | undefined;
        const msg = body?.message;
        setError(Array.isArray(msg) ? msg.join(', ') : msg || t('checkoutError'));
      } else {
        setError(t('checkoutError'));
      }
    } finally {
      setCheckingOut(false);
    }
  }

  if (itemList.length === 0) {
    return (
      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <h1>{t('title')}</h1>
        <p style={{ color: '#888', marginTop: '1rem' }}>{t('empty')}</p>
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
          {t('continueShopping')}
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 style={{ marginBottom: '1.5rem' }}>{t('title')}</h1>

      {error && (
        <p style={{ color: '#e53e3e', padding: '0.75rem', background: '#fff5f5', borderRadius: '6px', marginBottom: '1rem' }}>
          {error}
        </p>
      )}

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #eee', textAlign: 'left' }}>
            <th style={{ padding: '0.75rem' }}></th>
            <th style={{ padding: '0.75rem' }}>{t('product')}</th>
            <th style={{ padding: '0.75rem' }}>{t('price')}</th>
            <th style={{ padding: '0.75rem' }}>{t('qty')}</th>
            <th style={{ padding: '0.75rem' }}>{t('subtotal')}</th>
            <th style={{ padding: '0.75rem' }}></th>
          </tr>
        </thead>
        <tbody>
          {itemList.map((item) => (
            <tr key={item.productId} style={{ borderBottom: '1px solid #f0f0f0' }}>
              <td style={{ padding: '0.75rem', width: '60px' }}>
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                  />
                ) : (
                  <div style={{ width: '50px', height: '50px', background: '#f0f0f0', borderRadius: '4px' }} />
                )}
              </td>
              <td style={{ padding: '0.75rem', fontWeight: 500 }}>{item.title}</td>
              <td style={{ padding: '0.75rem' }}>{item.price.toFixed(2)} $</td>
              <td style={{ padding: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <button
                    onClick={() => setQty(item.productId, item.qty - 1)}
                    disabled={item.qty <= 1}
                    style={{
                      width: '28px',
                      height: '28px',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      cursor: item.qty <= 1 ? 'default' : 'pointer',
                      background: '#fff',
                      fontSize: '1rem',
                    }}
                  >
                    -
                  </button>
                  <span style={{ minWidth: '24px', textAlign: 'center' }}>{item.qty}</span>
                  <button
                    onClick={() => setQty(item.productId, item.qty + 1)}
                    style={{
                      width: '28px',
                      height: '28px',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      background: '#fff',
                      fontSize: '1rem',
                    }}
                  >
                    +
                  </button>
                </div>
              </td>
              <td style={{ padding: '0.75rem', fontWeight: 600 }}>
                {(item.price * item.qty).toFixed(2)} $
              </td>
              <td style={{ padding: '0.75rem' }}>
                <button
                  onClick={() => removeItem(item.productId)}
                  style={{
                    padding: '0.25rem 0.6rem',
                    border: '1px solid #e53e3e',
                    borderRadius: '4px',
                    color: '#e53e3e',
                    background: '#fff',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                  }}
                >
                  {t('remove')}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Total + checkout */}
      <div
        style={{
          marginTop: '1.5rem',
          padding: '1.5rem',
          background: '#f9f9f9',
          borderRadius: '8px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <p style={{ fontSize: '1.3rem', fontWeight: 700 }}>
          {t('total')}: {total.toFixed(2)} $
        </p>

        {authLoading ? (
          <span>{tc('loading')}</span>
        ) : !user ? (
          <Link
            href="/login"
            style={{
              padding: '0.7rem 1.5rem',
              background: '#333',
              color: '#fff',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            {t('loginToCheckout')}
          </Link>
        ) : isBuyer ? (
          <button
            onClick={handleCheckout}
            disabled={checkingOut}
            style={{
              padding: '0.7rem 2rem',
              background: checkingOut ? '#999' : '#2d6a4f',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 600,
              cursor: checkingOut ? 'default' : 'pointer',
              fontSize: '1rem',
            }}
          >
            {checkingOut ? t('checkoutLoading') : t('checkout')}
          </button>
        ) : (
          <p style={{ color: '#888' }}>{t('buyerOnly')}</p>
        )}
      </div>
    </div>
  );
}
