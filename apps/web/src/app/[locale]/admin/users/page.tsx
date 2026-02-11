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

  const roleBadgeClass: Record<string, string> = {
    ADMIN: 'bg-purple-500 text-white',
    SELLER: 'bg-blue-500 text-white',
    BUYER: 'bg-green-500 text-white',
  };

  const roleBadge = (role: string) => (
    <span className={`inline-block py-0.5 px-2 rounded-xl text-xs font-semibold ${roleBadgeClass[role] || 'bg-gray-500 text-white'}`}>
      {role}
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
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
        />
        <select
          className="w-full min-w-[120px]"
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
        <p className="text-gray-500">{t('noUsers')}</p>
      ) : (
        <>
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200 text-left">
                <th className="p-2">{t('name')}</th>
                <th className="p-2">{t('email')}</th>
                <th className="p-2">{t('phone')}</th>
                <th className="p-2">{t('role')}</th>
                <th className="p-2">{t('blocked')}</th>
                <th className="p-2">{tc('actions')}</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((u) => {
                const isSelf = u.id === currentUser?.id;
                return (
                  <tr key={u.id} className={`border-b border-gray-200 ${isSelf ? 'opacity-60' : ''}`}>
                    <td className="p-2">{u.name}</td>
                    <td className="p-2 text-sm">{u.email}</td>
                    <td className="p-2 text-sm">{u.phone || '—'}</td>
                    <td className="p-2">{roleBadge(u.role)}</td>
                    <td className="p-2">
                      {u.isBlocked ? (
                        <span className="inline-block py-0.5 px-2 rounded-xl text-xs font-semibold bg-red-500 text-white">{t('blockedYes')}</span>
                      ) : (
                        <span className="text-gray-500 text-sm">{t('blockedNo')}</span>
                      )}
                    </td>
                    <td className="p-2">
                      {isSelf ? (
                        <span className="text-gray-500 text-xs">{t('selfProtection')}</span>
                      ) : (
                        <div className="flex gap-1 items-center">
                          <button
                            onClick={() => handleBlock(u.id, !u.isBlocked)}
                            className={`px-3 py-1.5 border rounded bg-white text-xs hover:bg-gray-50 disabled:opacity-50 ${
                              u.isBlocked ? 'border-green-600 text-green-600 hover:bg-green-50' : 'border-red-600 text-red-600 hover:bg-red-50'
                            }`}
                          >
                            {u.isBlocked ? t('unblock') : t('block')}
                          </button>
                          <select
                            value={u.role}
                            onChange={(e) => handleRoleChange(u.id, e.target.value)}
                            className="w-full text-sm py-1"
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
