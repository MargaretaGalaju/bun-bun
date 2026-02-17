'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useAuth } from '@/lib/auth/AuthContext';
import { useRouter, Link } from '@/i18n/navigation';
import { useEffect, useState, useCallback } from 'react';
import type { AdminCategoryDto } from '@bun-bun/shared';
import { getAdminCategories, deleteAdminCategory } from '@/lib/api/admin';

export default function AdminCategoriesPage() {
  const t = useTranslations('admin.categories');
  const tc = useTranslations('common');
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const locale = useLocale();

  const [categories, setCategories] = useState<AdminCategoryDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<'all' | 'top'>('all');

  useEffect(() => {
    if (!authLoading && user?.role !== 'ADMIN') {
      router.replace('/');
    }
  }, [authLoading, user, router]);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAdminCategories();
      setCategories(data);
    } catch {
      setError(tc('errorGeneric'));
    } finally {
      setLoading(false);
    }
  }, [tc]);

  useEffect(() => {
    if (user?.role === 'ADMIN') load();
  }, [user, load]);

  function getParentName(parentId: string | null) {
    if (!parentId) return '—';
    const parent = categories.find((c) => c.id === parentId);
    return parent?.name ?? '—';
  }

  const filteredCategories =
    filter === 'top' ? categories.filter((c) => c.parentId === null) : categories;

  async function handleDelete(id: string) {
    if (!window.confirm(t('confirmDelete'))) return;
    try {
      await deleteAdminCategory(id);
      await load();
    } catch {
      setError(tc('errorGeneric'));
    }
  }

  if (authLoading || loading) return <p>{tc('loading')}</p>;
  if (user?.role !== 'ADMIN') return null;

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
      <div className="flex justify-between items-center mb-4">
        <h1>{t('title')}</h1>
        <Link
          href="/admin/categories/new"
          className="px-3 py-1.5 border-0 rounded bg-green-700 text-white text-sm no-underline hover:bg-green-800"
        >
          + {t('add')}
        </Link>
      </div>

      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
            filter === 'all'
              ? 'bg-green-700 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {t('filterAll')}
        </button>
        <button
          onClick={() => setFilter('top')}
          className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
            filter === 'top'
              ? 'bg-green-700 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {t('filterTop')}
        </button>
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {filteredCategories.length === 0 ? (
        <p className="text-gray-500">{t('noCategories')}</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-200 text-left">
              <th className="p-2">{t('name')}</th>
              <th className="p-2">{t('nameRu')}</th>
              <th className="p-2">{t('nameRo')}</th>
              <th className="p-2">{t('image')}</th>
              <th className="p-2">{t('parent')}</th>
              <th className="p-2">{t('rating')}</th>
              <th className="p-2">{tc('actions')}</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.map((cat) => (
              <tr key={cat.id} className="border-b border-gray-200">
                <td className="p-2">{cat.name}</td>
                <td className={`p-2 ${cat.nameRu ? '' : 'text-gray-400'}`}>{cat.nameRu || '—'}</td>
                <td className={`p-2 ${cat.nameRo ? '' : 'text-gray-400'}`}>{cat.nameRo || '—'}</td>
                <td className="p-2">
                  {cat.imageUrl ? (
                    <img src={cat.imageUrl} alt="" className="w-8 h-8 object-cover rounded" />
                  ) : (
                    '—'
                  )}
                </td>
                <td className="p-2">{getParentName(cat.parentId)}</td>
                <td className="p-2">{cat.rating}</td>
                <td className="p-2">
                  <div className="flex gap-1">
                    <Link
                      href={`/admin/categories/${cat.id}/edit`}
                      className="px-3 py-1.5 border border-gray-300 rounded bg-white text-xs no-underline text-gray-800 hover:bg-gray-50"
                    >
                      {tc('edit')}
                    </Link>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="px-3 py-1.5 border border-red-600 text-red-600 rounded bg-white text-xs hover:bg-red-50"
                    >
                      {tc('delete')}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
