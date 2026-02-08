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
          background: locale === 'ru' ? '#e8f0fe' : 'transparent',
          border: '1px solid #ccc',
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
          background: locale === 'ro' ? '#e8f0fe' : 'transparent',
          border: '1px solid #ccc',
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
    <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
      <Link href="/" style={{ fontWeight: 'bold', fontSize: '1.2rem', textDecoration: 'none' }}>
        {t('brand')}
      </Link>
      <Link href="/products">{t('products')}</Link>
      {user?.role === 'SELLER' && (
        <>
          <Link href="/seller/products">{t('myProducts')}</Link>
          <Link href="/seller/orders">{t('sellerOrders')}</Link>
        </>
      )}
      {user?.role === 'BUYER' && (
        <Link href="/orders">{t('orders')}</Link>
      )}
      <Link href="/cart">
        {t('cart')}{itemCount > 0 && ` (${itemCount})`}
      </Link>
      {user?.role === 'ADMIN' && (
        <Link href="/admin">{t('admin')}</Link>
      )}

      <div style={{ marginLeft: 'auto', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <LanguageSwitcher />

        {isLoading ? (
          <span style={{ color: '#999', fontSize: '0.9rem' }}>...</span>
        ) : user ? (
          <>
            <span style={{ fontSize: '0.9rem' }}>
              {user.name} ({user.role})
            </span>
            <button
              onClick={() => logout()}
              style={{
                padding: '0.3rem 0.8rem',
                cursor: 'pointer',
                background: 'none',
                border: '1px solid #ccc',
                borderRadius: 4,
              }}
            >
              {t('logout')}
            </button>
          </>
        ) : (
          <>
            <Link href="/login">{t('login')}</Link>
            <Link href="/register">{t('register')}</Link>
          </>
        )}
      </div>
    </nav>
  );
}
