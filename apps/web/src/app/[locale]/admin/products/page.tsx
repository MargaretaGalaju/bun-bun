'use client';

import { useTranslations } from 'next-intl';
import { useAuth } from '@/lib/auth/AuthContext';
import { useRouter } from '@/i18n/navigation';
import { useEffect, useState, useCallback } from 'react';
import type { AdminProductDto, PagedResponse } from '@bun-bun/shared';
import { getAdminProducts, changeAdminProductStatus } from '@/lib/api/admin';

export default function AdminProductsPage() {
  const t = useTranslations('admin.products');
  const tc = useTranslations('common');
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

  const inputStyle = {
    padding: '0.4rem 0.6rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '0.9rem',
  } as const;

  const btnStyle = {
    padding: '0.4rem 0.8rem',
    cursor: 'pointer',
    border: '1px solid #ccc',
    borderRadius: '4px',
    background: 'white',
    fontSize: '0.85rem',
  } as const;

  const statusColors: Record<string, string> = {
    ACTIVE: '#4CAF50',
    DRAFT: '#FF9800',
    HIDDEN: '#f44336',
    ARCHIVED: '#9E9E9E',
  };

  const statusBadge = (status: string) => (
    <span
      style={{
        display: 'inline-block',
        padding: '0.15rem 0.5rem',
        borderRadius: '12px',
        fontSize: '0.75rem',
        fontWeight: 600,
        background: statusColors[status] || '#999',
        color: 'white',
      }}
    >
      {status}
    </span>
  );

  return (
    <div>
      <h1 style={{ marginBottom: '1rem' }}>{t('title')}</h1>

      {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}

      {/* Filters */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <input
          style={{ ...inputStyle, minWidth: '200px' }}
          placeholder={t('search')}
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
        />
        <select
          style={inputStyle}
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
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
        <p style={{ color: '#999' }}>{t('noProducts')}</p>
      ) : (
        <>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #ddd', textAlign: 'left' }}>
                <th style={{ padding: '0.5rem' }}>{t('productTitle')}</th>
                <th style={{ padding: '0.5rem' }}>{t('seller')}</th>
                <th style={{ padding: '0.5rem' }}>{tc('status')}</th>
                <th style={{ padding: '0.5rem' }}>{t('price')}</th>
                <th style={{ padding: '0.5rem' }}>{t('city')}</th>
                <th style={{ padding: '0.5rem' }}>{t('setStatus')}</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((p) => (
                <tr key={p.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '0.5rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      {p.images.length > 0 && (
                        <img
                          src={p.images[0].url}
                          alt=""
                          style={{ width: 32, height: 32, objectFit: 'cover', borderRadius: 4 }}
                        />
                      )}
                      <span>{p.title}</span>
                    </div>
                  </td>
                  <td style={{ padding: '0.5rem', fontSize: '0.9rem' }}>
                    <div>{p.sellerName}</div>
                    <div style={{ color: '#999', fontSize: '0.8rem' }}>{p.sellerEmail}</div>
                  </td>
                  <td style={{ padding: '0.5rem' }}>{statusBadge(p.status)}</td>
                  <td style={{ padding: '0.5rem' }}>${p.price.toFixed(2)}</td>
                  <td style={{ padding: '0.5rem', color: '#666' }}>{p.city || '—'}</td>
                  <td style={{ padding: '0.5rem' }}>
                    <select
                      value={p.status}
                      onChange={(e) => handleStatusChange(p.id, e.target.value)}
                      style={{ ...inputStyle, fontSize: '0.8rem', padding: '0.3rem' }}
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
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', justifyContent: 'center' }}>
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                style={btnStyle}
              >
                &laquo;
              </button>
              <span style={{ padding: '0.4rem 0.6rem', fontSize: '0.9rem' }}>
                {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                style={btnStyle}
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
