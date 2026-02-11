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
      <div className="text-center mt-12">
        <h1>{t('title')}</h1>
        <p className="text-gray-500 mt-4">{t('empty')}</p>
        <Link
          href="/products"
          className="inline-block mt-4 px-6 py-2 bg-green-700 text-white rounded-md no-underline"
        >
          {t('continueShopping')}
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6">{t('title')}</h1>

      {error && <p className="text-red-600 p-3 bg-red-50 rounded-md mb-4">{error}</p>}

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b-2 border-gray-200 text-left">
            <th className="p-3"></th>
            <th className="p-3">{t('product')}</th>
            <th className="p-3">{t('price')}</th>
            <th className="p-3">{t('qty')}</th>
            <th className="p-3">{t('subtotal')}</th>
            <th className="p-3"></th>
          </tr>
        </thead>
        <tbody>
          {itemList.map((item) => (
            <tr key={item.productId} className="border-b border-gray-100">
              <td className="p-3 w-[60px]">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-[50px] h-[50px] object-cover rounded"
                  />
                ) : (
                  <div className="w-[50px] h-[50px] bg-gray-100 rounded" />
                )}
              </td>
              <td className="p-3 font-medium">{item.title}</td>
              <td className="p-3">{item.price.toFixed(2)} $</td>
              <td className="p-3">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setQty(item.productId, item.qty - 1)}
                    disabled={item.qty <= 1}
                    className="w-7 h-7 border border-gray-300 rounded cursor-pointer bg-white text-base disabled:cursor-default disabled:opacity-60"
                  >
                    -
                  </button>
                  <span className="min-w-6 text-center">{item.qty}</span>
                  <button
                    onClick={() => setQty(item.productId, item.qty + 1)}
                    className="w-7 h-7 border border-gray-300 rounded cursor-pointer bg-white text-base"
                  >
                    +
                  </button>
                </div>
              </td>
              <td className="p-3 font-semibold">{(item.price * item.qty).toFixed(2)} $</td>
              <td className="p-3">
                <button
                  onClick={() => removeItem(item.productId)}
                  className="py-1 px-2.5 border border-red-600 rounded text-red-600 bg-white cursor-pointer text-sm"
                >
                  {t('remove')}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Total + checkout */}
      <div className="mt-6 p-6 bg-gray-50 rounded-lg flex justify-between items-center flex-wrap gap-4">
        <p className="text-xl font-bold">
          {t('total')}: {total.toFixed(2)} $
        </p>

        {authLoading ? (
          <span>{tc('loading')}</span>
        ) : !user ? (
          <Link
            href="/login"
            className="py-2.5 px-6 bg-gray-800 text-white rounded-md no-underline font-semibold"
          >
            {t('loginToCheckout')}
          </Link>
        ) : isBuyer ? (
          <button
            onClick={handleCheckout}
            disabled={checkingOut}
            className="py-2.5 px-8 bg-green-700 text-white border-none rounded-md font-semibold text-base disabled:bg-gray-500 disabled:cursor-default cursor-pointer"
          >
            {checkingOut ? t('checkoutLoading') : t('checkout')}
          </button>
        ) : (
          <p className="text-gray-500">{t('buyerOnly')}</p>
        )}
      </div>
    </div>
  );
}
