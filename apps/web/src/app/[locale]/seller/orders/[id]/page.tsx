'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import type { SellerOrderDetailsDto } from '@bun-bun/shared';
import { getSellerOrder, updateSellerOrderStatus } from '@/lib/api/sellerOrders';

function StatusBadge({ status, t }: { status: string; t: (key: string) => string }) {
  const classMap: Record<string, string> = {
    PENDING: 'bg-yellow-500 text-white',
    CONFIRMED: 'bg-green-500 text-white',
    DELIVERED: 'bg-blue-500 text-white',
    CANCELLED: 'bg-red-500 text-white',
  };
  const cls = classMap[status] || classMap.PENDING;
  const labelKey = `status${status.charAt(0) + status.slice(1).toLowerCase()}`;
  return (
    <span className={`py-0.5 px-2 rounded-xl text-sm font-semibold ${cls}`}>
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
      <div className="text-center mt-12">
        <p className="text-lg text-gray-500">{t('accessRequired')}</p>
        <Link
          href="/login"
          className="inline-block mt-4 px-6 py-2 bg-gray-800 text-white rounded-md no-underline hover:bg-gray-700"
        >
          {tc('error401')}
        </Link>
      </div>
    );
  }

  if (loading) return <p>{tc('loading')}</p>;

  if (error && !order) {
    return <p className="text-red-600">{error}</p>;
  }

  if (!order) return <p>{tc('errorGeneric')}</p>;

  return (
    <div>
      <Link
        href="/seller/orders"
        className="inline-block mb-4 text-gray-500 no-underline hover:text-gray-700"
      >
        {t('backToList')}
      </Link>

      <div className="flex items-center gap-4 mb-6">
        <h1 className="m-0">{t('title')} #{order.id.slice(0, 8)}</h1>
        <StatusBadge status={order.status} t={t} />
      </div>

      {successMsg && (
        <p className="text-green-700 bg-green-100 p-4 rounded-lg mb-4">
          {successMsg}
        </p>
      )}
      {error && order && (
        <p className="text-red-600 bg-red-50 p-4 rounded-lg mb-4">
          {error}
        </p>
      )}

      {/* Buyer info */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <p className="my-1">
          <strong>{t('buyer')}:</strong> {order.buyer.name}
        </p>
        <p className="my-1">
          <strong>{t('email')}:</strong> {order.buyer.email}
        </p>
        {order.buyer.phone && (
          <p className="my-1">
            <strong>{t('phone')}:</strong> {order.buyer.phone}
          </p>
        )}
        <p className="my-1">
          <strong>{t('createdAt')}:</strong> {new Date(order.createdAt).toLocaleString()}
        </p>
      </div>

      {/* Items table */}
      <table className="w-full border-collapse mb-6">
        <thead>
          <tr className="border-b-2 border-gray-200 text-left">
            <th className="p-3">{t('product')}</th>
            <th className="p-3">{t('qty')}</th>
            <th className="p-3">{t('price')}</th>
            <th className="p-3">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item) => (
            <tr key={item.id} className="border-b border-gray-200">
              <td className="p-3">{item.productTitle}</td>
              <td className="p-3">{item.qty}</td>
              <td className="p-3">{item.priceSnapshot.toFixed(2)} $</td>
              <td className="p-3 font-semibold">
                {(item.qty * item.priceSnapshot).toFixed(2)} $
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="text-xl font-bold">
        {t('total')}: {order.total.toFixed(2)} $
      </p>

      {/* Action buttons */}
      <div className="flex gap-3 mt-6">
        {order.status === 'PENDING' && (
          <>
            <button
              disabled={updating}
              onClick={() => handleStatusChange('CONFIRMED')}
              className="px-6 py-2 bg-green-700 text-white border-none rounded-md font-semibold cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed hover:bg-green-800"
            >
              {t('accept')}
            </button>
            <button
              disabled={updating}
              onClick={() => handleStatusChange('CANCELLED')}
              className="px-6 py-2 bg-red-600 text-white border-none rounded-md font-semibold cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed hover:bg-red-700"
            >
              {t('reject')}
            </button>
          </>
        )}
        {order.status === 'CONFIRMED' && (
          <button
            disabled={updating}
            onClick={() => handleStatusChange('DELIVERED')}
            className="px-6 py-2 bg-blue-600 text-white border-none rounded-md font-semibold cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed hover:bg-blue-700"
          >
            {t('done')}
          </button>
        )}
      </div>
    </div>
  );
}
