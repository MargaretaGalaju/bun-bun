'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useAuth } from '@/lib/auth/AuthContext';
import { useRouter } from '@/i18n/navigation';
import { useEffect, useState, useCallback } from 'react';
import type { AdminProductDto, PagedResponse } from '@bun-bun/shared';
import { getAdminProducts, changeAdminProductStatus } from '@/lib/api/admin';

export default function AdminProductsPage() {
  const t = useTranslations('admin.products');
  const tc = useTranslations('common');
  const locale = useLocale();
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [data, setData] = useState<PagedResponse<AdminProductDto> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 20;

  useEffect(() => {
    if (!authLoading && user?.role !== 'ADMIN') {
      router.replace('/');
    }
  }, [authLoading, user, router]);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const result = await getAdminProducts({
        q: search || undefined,
        status: statusFilter || undefined,
        page,
        pageSize,
      });
      setData(result);
    } catch {
      setError(tc('errorGeneric'));
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, page, pageSize, tc]);

  useEffect(() => {
    if (user?.role === 'ADMIN') load();
  }, [user, load]);

  async function handleStatusChange(id: string, status: string) {
    try {
      await changeAdminProductStatus(id, status);
      await load();
    } catch {
      setError(tc('errorGeneric'));
    }
  }

  if (authLoading) return <p>{tc('loading')}</p>;
  if (user?.role !== 'ADMIN') return null;

  const totalPages = data ? Math.ceil(data.total / pageSize) : 0;

  const statusBadgeClass: Record<string, string> = {
    ACTIVE: 'bg-green-500 text-white',
    DRAFT: 'bg-yellow-500 text-white',
    HIDDEN: 'bg-red-500 text-white',
    ARCHIVED: 'bg-gray-500 text-white',
  };

  const statusBadge = (status: string) => (
    <span
      className={`inline-block py-0.5 px-2 rounded-xl text-xs font-semibold ${statusBadgeClass[status] || 'bg-gray-500 text-white'}`}
    >
      {status}
    </span>
  );

  return (
    <div>
      <h1 className="mb-4">{t('title')}</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {/* Filters */}
      <div className="flex gap-3 mb-4 flex-wrap">
        <input
          className="w-full min-w-[200px]"
          placeholder={t('search')}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <select
          className="w-full min-w-[120px]"
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="">{t('allStatuses')}</option>
          <option value="ACTIVE">ACTIVE</option>
          <option value="DRAFT">DRAFT</option>
          <option value="HIDDEN">HIDDEN</option>
          <option value="ARCHIVED">ARCHIVED</option>
        </select>
      </div>

      {loading ? (
        <p>{tc('loading')}</p>
      ) : !data || data.items.length === 0 ? (
        <p className="text-gray-500">{t('noProducts')}</p>
      ) : (
        <>
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200 text-left">
                <th className="p-2">{t('productTitle')}</th>
                <th className="p-2">{t('seller')}</th>
                <th className="p-2">{tc('status')}</th>
                <th className="p-2">{t('price')}</th>
                <th className="p-2">{t('city')}</th>
                <th className="p-2">{t('setStatus')}</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((p) => (
                <tr key={p.id} className="border-b border-gray-200">
                  <td className="p-2">
                    <div className="flex gap-2 items-center">
                      {p.images.length > 0 && (
                        <img
                          src={p.images[0].url}
                          alt=""
                          className="w-8 h-8 object-cover rounded"
                        />
                      )}
                      <span>{locale === 'ro' ? p.titleRo : p.titleRu}</span>
                    </div>
                  </td>
                  <td className="p-2 text-sm">
                    <div>{p.sellerName}</div>
                    <div className="text-gray-500 text-xs">{p.sellerEmail}</div>
                  </td>
                  <td className="p-2">{statusBadge(p.status)}</td>
                  <td className="p-2">${p.price.toFixed(2)}</td>
                  <td className="p-2 text-gray-500">{p.city || '—'}</td>
                  <td className="p-2">
                    <select
                      value={p.status}
                      onChange={(e) => handleStatusChange(p.id, e.target.value)}
                      className="w-full text-sm py-1"
                    >
                      <option value="ACTIVE">ACTIVE</option>
                      <option value="DRAFT">DRAFT</option>
                      <option value="HIDDEN">HIDDEN</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex gap-2 mt-4 justify-center items-center">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="px-3 py-1.5 border border-gray-300 rounded bg-white text-sm hover:bg-gray-50 disabled:opacity-50"
              >
                &laquo;
              </button>
              <span className="px-3 py-1.5 text-sm">
                {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="px-3 py-1.5 border border-gray-300 rounded bg-white text-sm hover:bg-gray-50 disabled:opacity-50"
              >
                &raquo;
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
