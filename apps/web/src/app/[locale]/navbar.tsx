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
    <div className="flex">
      <button
        onClick={() => switchTo('ru')}
        disabled={locale === 'ru'}
        className={`px-2 py-1 text-xs text-white border border-gray-600 rounded-l transition-colors ${
          locale === 'ru' ? 'bg-gray-600 font-bold' : 'bg-transparent opacity-70 hover:opacity-100'
        }`}
      >
        RU
      </button>
      <button
        onClick={() => switchTo('ro')}
        disabled={locale === 'ro'}
        className={`px-2 py-1 text-xs text-white border border-gray-600 border-l-0 rounded-r transition-colors ${
          locale === 'ro' ? 'bg-gray-600 font-bold' : 'bg-transparent opacity-70 hover:opacity-100'
        }`}
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

  const linkClass = 'text-white no-underline text-sm hover:text-gray-300 transition-colors';

  return (
    <nav className="flex items-center gap-5 bg-[#1e1e1e] px-6 py-3">
      <Link href="/" className="flex items-center no-underline">
        <img
          src="https://pub-82a0121d9a324bf3a27b7bd9e2511bba.r2.dev/bunbun-logo-white.svg"
          alt="BunBun"
          className="h-7 w-auto"
        />
      </Link>
      <Link href="/products" className={linkClass}>
        {t('products')}
      </Link>
      {user?.role === 'SELLER' && (
        <>
          <Link href="/seller/products" className={linkClass}>
            {t('myProducts')}
          </Link>
          <Link href="/seller/orders" className={linkClass}>
            {t('sellerOrders')}
          </Link>
        </>
      )}
      {user?.role === 'BUYER' && (
        <Link href="/orders" className={linkClass}>
          {t('orders')}
        </Link>
      )}
      <Link href="/cart" className={linkClass}>
        {t('cart')}
        {itemCount > 0 && (
          <span className="ml-1 bg-green-700 text-white text-xs rounded-full px-1.5 py-0.5">
            {itemCount}
          </span>
        )}
      </Link>
      {user?.role === 'ADMIN' && (
        <Link href="/admin" className={linkClass}>
          {t('admin')}
        </Link>
      )}

      <div className="ml-auto flex items-center gap-3">
        <LanguageSwitcher />

        {isLoading ? (
          <span className="text-gray-400 text-sm">...</span>
        ) : user ? (
          <>
            <span className="text-sm text-gray-400">
              {user.name} ({user.role})
            </span>
            <button
              onClick={() => logout()}
              className="px-3 py-1 text-sm text-white border border-gray-600 rounded bg-transparent hover:bg-gray-700 transition-colors"
            >
              {t('logout')}
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className={linkClass}>
              {t('login')}
            </Link>
            <Link href="/register" className={linkClass}>
              {t('register')}
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
