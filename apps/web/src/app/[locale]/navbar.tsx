'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useAuth } from '@/lib/auth/AuthContext';
import { useCart } from '@/features/cart/CartContext';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';

function LanguageSwitcher() {
  const locale = useLocale();

  function switchTo(newLocale: Locale) {
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000`;
    window.location.reload();
  }

  return (
    <div style={{ display: 'flex', gap: '0.25rem' }}>
      <button
        onClick={() => switchTo('ru')}
        disabled={locale === 'ru'}
        style={{
          padding: '0.2rem 0.5rem',
          cursor: locale === 'ru' ? 'default' : 'pointer',
          fontWeight: locale === 'ru' ? 'bold' : 'normal',
          background: locale === 'ru' ? '#444' : 'transparent',
          color: '#fff',
          border: '1px solid #555',
          borderRadius: '4px 0 0 4px',
          opacity: locale === 'ru' ? 1 : 0.7,
        }}
      >
        RU
      </button>
      <button
        onClick={() => switchTo('ro')}
        disabled={locale === 'ro'}
        style={{
          padding: '0.2rem 0.5rem',
          cursor: locale === 'ro' ? 'default' : 'pointer',
          fontWeight: locale === 'ro' ? 'bold' : 'normal',
          background: locale === 'ro' ? '#444' : 'transparent',
          color: '#fff',
          border: '1px solid #555',
          borderRadius: '0 4px 4px 0',
          opacity: locale === 'ro' ? 1 : 0.7,
        }}
      >
        RO
      </button>
    </div>
  );
}

export function NavBar() {
  const { user, isLoading, logout } = useAuth();
  const { itemCount } = useCart();
  const t = useTranslations('nav');

  return (
    <nav
      style={{
        display: 'flex',
        gap: '1.5rem',
        alignItems: 'center',
        background: '#1e1e1e',
        padding: '1rem 2rem',
      }}
    >
      <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
        <img
          src="https://pub-82a0121d9a324bf3a27b7bd9e2511bba.r2.dev/bunbun-logo-white.svg"
          alt="BunBun"
          style={{ height: '28px', width: 'auto' }}
        />
      </Link>
      <Link href="/products" style={{ color: '#fff', textDecoration: 'none' }}>
        {t('products')}
      </Link>
      {user?.role === 'SELLER' && (
        <>
          <Link href="/seller/products" style={{ color: '#fff', textDecoration: 'none' }}>
            {t('myProducts')}
          </Link>
          <Link href="/seller/orders" style={{ color: '#fff', textDecoration: 'none' }}>
            {t('sellerOrders')}
          </Link>
        </>
      )}
      {user?.role === 'BUYER' && (
        <Link href="/orders" style={{ color: '#fff', textDecoration: 'none' }}>
          {t('orders')}
        </Link>
      )}
      <Link href="/cart" style={{ color: '#fff', textDecoration: 'none' }}>
        {t('cart')}
        {itemCount > 0 && ` (${itemCount})`}
      </Link>
      {user?.role === 'ADMIN' && (
        <Link href="/admin" style={{ color: '#fff', textDecoration: 'none' }}>
          {t('admin')}
        </Link>
      )}

      <div style={{ marginLeft: 'auto', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <LanguageSwitcher />

        {isLoading ? (
          <span style={{ color: '#999', fontSize: '0.9rem' }}>...</span>
        ) : user ? (
          <>
            <span style={{ fontSize: '0.9rem', color: '#ccc' }}>
              {user.name} ({user.role})
            </span>
            <button
              onClick={() => logout()}
              style={{
                padding: '0.3rem 0.8rem',
                cursor: 'pointer',
                background: 'none',
                color: '#fff',
                border: '1px solid #555',
                borderRadius: 4,
              }}
            >
              {t('logout')}
            </button>
          </>
        ) : (
          <>
            <Link href="/login" style={{ color: '#fff', textDecoration: 'none' }}>
              {t('login')}
            </Link>
            <Link href="/register" style={{ color: '#fff', textDecoration: 'none' }}>
              {t('register')}
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
