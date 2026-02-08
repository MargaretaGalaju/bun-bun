'use client';

import { useTranslations } from 'next-intl';
import { useAuth } from '@/lib/auth/AuthContext';
import { useRouter } from '@/i18n/navigation';
import { useEffect, useState, useCallback } from 'react';
import type { AdminUserDto, PagedResponse } from '@bun-bun/shared';
import { getAdminUsers, blockAdminUser, changeAdminUserRole } from '@/lib/api/admin';

export default function AdminUsersPage() {
  const t = useTranslations('admin.users');
  const tc = useTranslations('common');
  const { user: currentUser, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [data, setData] = useState<PagedResponse<AdminUserDto> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 20;

  useEffect(() => {
    if (!authLoading && currentUser?.role !== 'ADMIN') {
      router.replace('/');
    }
  }, [authLoading, currentUser, router]);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const result = await getAdminUsers({
        q: search || undefined,
        role: roleFilter || undefined,
        page,
        pageSize,
      });
      setData(result);
    } catch {
      setError(tc('errorGeneric'));
    } finally {
      setLoading(false);
    }
  }, [search, roleFilter, page, pageSize, tc]);

  useEffect(() => {
    if (currentUser?.role === 'ADMIN') load();
  }, [currentUser, load]);

  async function handleBlock(id: string, isBlocked: boolean) {
    try {
      await blockAdminUser(id, isBlocked);
      await load();
    } catch {
      setError(tc('errorGeneric'));
    }
  }

  async function handleRoleChange(id: string, role: string) {
    try {
      await changeAdminUserRole(id, role);
      await load();
    } catch {
      setError(tc('errorGeneric'));
    }
  }

  if (authLoading) return <p>{tc('loading')}</p>;
  if (currentUser?.role !== 'ADMIN') return null;

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

  const badgeStyle = (color: string) => ({
    display: 'inline-block',
    padding: '0.15rem 0.5rem',
    borderRadius: '12px',
    fontSize: '0.75rem',
    fontWeight: 600 as const,
    background: color,
    color: 'white',
  });

  const roleBadge = (role: string) => {
    const colors: Record<string, string> = {
      ADMIN: '#9c27b0',
      SELLER: '#2196F3',
      BUYER: '#4CAF50',
    };
    return <span style={badgeStyle(colors[role] || '#999')}>{role}</span>;
  };

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
          value={roleFilter}
          onChange={(e) => { setRoleFilter(e.target.value); setPage(1); }}
        >
          <option value="">{t('allRoles')}</option>
          <option value="BUYER">BUYER</option>
          <option value="SELLER">SELLER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
      </div>

      {loading ? (
        <p>{tc('loading')}</p>
      ) : !data || data.items.length === 0 ? (
        <p style={{ color: '#999' }}>{t('noUsers')}</p>
      ) : (
        <>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #ddd', textAlign: 'left' }}>
                <th style={{ padding: '0.5rem' }}>{t('name')}</th>
                <th style={{ padding: '0.5rem' }}>{t('email')}</th>
                <th style={{ padding: '0.5rem' }}>{t('phone')}</th>
                <th style={{ padding: '0.5rem' }}>{t('role')}</th>
                <th style={{ padding: '0.5rem' }}>{t('blocked')}</th>
                <th style={{ padding: '0.5rem' }}>{tc('actions')}</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((u) => {
                const isSelf = u.id === currentUser?.id;
                return (
                  <tr key={u.id} style={{ borderBottom: '1px solid #eee', opacity: isSelf ? 0.6 : 1 }}>
                    <td style={{ padding: '0.5rem' }}>{u.name}</td>
                    <td style={{ padding: '0.5rem', fontSize: '0.9rem' }}>{u.email}</td>
                    <td style={{ padding: '0.5rem', fontSize: '0.9rem' }}>{u.phone || '—'}</td>
                    <td style={{ padding: '0.5rem' }}>{roleBadge(u.role)}</td>
                    <td style={{ padding: '0.5rem' }}>
                      {u.isBlocked ? (
                        <span style={badgeStyle('#f44336')}>{t('blockedYes')}</span>
                      ) : (
                        <span style={{ color: '#999', fontSize: '0.85rem' }}>{t('blockedNo')}</span>
                      )}
                    </td>
                    <td style={{ padding: '0.5rem' }}>
                      {isSelf ? (
                        <span style={{ color: '#999', fontSize: '0.8rem' }}>{t('selfProtection')}</span>
                      ) : (
                        <div style={{ display: 'flex', gap: '0.3rem', alignItems: 'center' }}>
                          <button
                            onClick={() => handleBlock(u.id, !u.isBlocked)}
                            style={{
                              ...btnStyle,
                              fontSize: '0.8rem',
                              color: u.isBlocked ? '#4CAF50' : '#f44336',
                              borderColor: u.isBlocked ? '#4CAF50' : '#f44336',
                            }}
                          >
                            {u.isBlocked ? t('unblock') : t('block')}
                          </button>
                          <select
                            value={u.role}
                            onChange={(e) => handleRoleChange(u.id, e.target.value)}
                            style={{ ...inputStyle, fontSize: '0.8rem', padding: '0.3rem' }}
                          >
                            <option value="BUYER">BUYER</option>
                            <option value="SELLER">SELLER</option>
                            <option value="ADMIN">ADMIN</option>
                          </select>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
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
