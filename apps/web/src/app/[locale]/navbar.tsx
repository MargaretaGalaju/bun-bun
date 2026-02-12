'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useAuth } from '@/lib/auth/AuthContext';
import { useCart } from '@/features/cart/CartContext';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';

function HamburgerIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function CartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  );
}

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
        className={`px-2 py-1 text-xs border border-gray-300 rounded-l transition-colors ${
          locale === 'ru'
            ? 'bg-gray-200 text-gray-900 font-bold'
            : 'bg-white text-gray-600 hover:bg-gray-50'
        }`}
      >
        RU
      </button>
      <button
        onClick={() => switchTo('ro')}
        disabled={locale === 'ro'}
        className={`px-2 py-1 text-xs border border-gray-300 border-l-0 rounded-r transition-colors ${
          locale === 'ro'
            ? 'bg-gray-200 text-gray-900 font-bold'
            : 'bg-white text-gray-600 hover:bg-gray-50'
        }`}
      >
        RO
      </button>
    </div>
  );
}

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  linkClass: string;
  t: (key: string) => string;
  user: { name: string; role: string } | null;
  isLoading: boolean;
  logout: () => void;
};

function MobileMenu({ isOpen, onClose, linkClass, t, user, isLoading, logout }: MobileMenuProps) {
  return (
    <div
      className={`md:hidden fixed inset-0 z-[60] transition-opacity duration-200 ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
      aria-hidden={!isOpen}
    >
      {/* Overlay */}
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
        aria-label={t('close')}
      />

      {/* Drawer panel */}
      <div
        className={`absolute top-0 right-0 h-full w-72 max-w-[85vw] bg-white shadow-xl flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
          <span className="text-lg font-semibold text-gray-900">{t('brand')}</span>
          <button
            type="button"
            onClick={onClose}
            className="p-2 -m-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
            aria-label={t('close')}
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-4 flex flex-col gap-1">
          <Link href="/" className={`${linkClass} py-3 block`} onClick={onClose}>
            {t('home')}
          </Link>
          <Link href="/products" className={`${linkClass} py-3 block`} onClick={onClose}>
            {t('products')}
          </Link>
          <Link href="/contact" className={`${linkClass} py-3 block`} onClick={onClose}>
            {t('contact')}
          </Link>

          {(user?.role === 'SELLER' || user?.role === 'BUYER' || user?.role === 'ADMIN') && (
            <div className="border-t border-gray-200 my-2 pt-3">
              {user?.role === 'SELLER' && (
                <>
                  <Link
                    href="/seller/products"
                    className={`${linkClass} py-3 block`}
                    onClick={onClose}
                  >
                    {t('myProducts')}
                  </Link>
                  <Link
                    href="/seller/orders"
                    className={`${linkClass} py-3 block`}
                    onClick={onClose}
                  >
                    {t('sellerOrders')}
                  </Link>
                </>
              )}
              {user?.role === 'BUYER' && (
                <Link href="/orders" className={`${linkClass} py-3 block`} onClick={onClose}>
                  {t('orders')}
                </Link>
              )}
              {user?.role === 'ADMIN' && (
                <Link href="/admin" className={`${linkClass} py-3 block`} onClick={onClose}>
                  {t('admin')}
                </Link>
              )}
            </div>
          )}

          <div className="border-t border-gray-200 my-2 pt-3">
            {isLoading ? (
              <span className="text-gray-400 text-sm py-3 block">...</span>
            ) : user ? (
              <div className="flex flex-col gap-2">
                <span className="text-sm text-gray-600 py-2">{user.name}</span>
                <button
                  onClick={() => {
                    logout();
                    onClose();
                  }}
                  className="px-3 py-2 text-sm text-left text-gray-700 border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition-colors w-fit"
                >
                  {t('logout')}
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-1">
                <Link href="/login" className={`${linkClass} py-3 block`} onClick={onClose}>
                  {t('login')}
                </Link>
                <Link
                  href="/register"
                  className={`${linkClass} font-semibold text-green-700 py-3 block`}
                  onClick={onClose}
                >
                  {t('register')}
                </Link>
              </div>
            )}
          </div>

          <div className="border-t border-gray-200 my-2 pt-3">
            <span className="text-xs text-gray-500 block mb-2">{t('language')}</span>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </div>
  );
}

export function NavBar() {
  const { user, isLoading, logout } = useAuth();
  const { itemCount } = useCart();
  const t = useTranslations('nav');
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass =
    'text-gray-700 no-underline text-sm hover:text-green-700 transition-colors font-medium';

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <nav className="sticky top-0 z-50 flex items-center justify-between gap-4 bg-white border-b border-gray-200 px-3 py-3 md:px-6 md:py-4 shadow-sm">
        <Link href="/" className="flex items-center no-underline shrink-0">
          <img
            src="https://pub-82a0121d9a324bf3a27b7bd9e2511bba.r2.dev/bunbun-logo-white.svg"
            alt={t('brand')}
            className="h-7 w-auto block invert"
          />
        </Link>

        {/* Desktop: main nav links */}
        <div className="hidden md:flex flex-1 items-center gap-6">
          <Link href="/" className={linkClass}>
            {t('home')}
          </Link>
          <Link href="/products" className={linkClass}>
            {t('products')}
          </Link>
          <Link href="/contact" className={linkClass}>
            {t('contact')}
          </Link>
        </div>

        {/* Desktop: right block */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <Link href="/cart" className={`${linkClass} flex items-center gap-1`}>
            {t('cart')}
            {itemCount > 0 && (
              <span className="bg-green-600 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[1.25rem] text-center">
                {itemCount}
              </span>
            )}
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
          {user?.role === 'ADMIN' && (
            <Link href="/admin" className={linkClass}>
              {t('admin')}
            </Link>
          )}
          <LanguageSwitcher />
          {isLoading ? (
            <span className="text-gray-400 text-sm">...</span>
          ) : user ? (
            <>
              <span className="text-sm text-gray-600">{user.name}</span>
              <button
                onClick={() => logout()}
                className="px-3 py-1.5 text-sm text-gray-700 border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition-colors"
              >
                {t('logout')}
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className={linkClass}>
                {t('login')}
              </Link>
              <Link href="/register" className={`${linkClass} font-semibold text-green-700`}>
                {t('register')}
              </Link>
            </>
          )}
        </div>

        {/* Mobile: cart icon + hamburger */}
        <div className="flex md:hidden items-center gap-1 shrink-0">
          <Link
            href="/cart"
            className="relative p-2 text-gray-700 hover:text-green-700 transition-colors no-underline"
            aria-label={t('cart')}
          >
            <CartIcon className="w-6 h-6" />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                {itemCount}
              </span>
            )}
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="p-2 text-gray-700 hover:text-green-700 hover:bg-gray-100 rounded-md transition-colors"
            aria-label={t('menu')}
          >
            <HamburgerIcon className="w-6 h-6" />
          </button>
        </div>
      </nav>

      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        linkClass={linkClass}
        t={t}
        user={user ?? null}
        isLoading={isLoading}
        logout={logout}
      />
    </>
  );
}
