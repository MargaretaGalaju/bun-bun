'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useAuth } from '@/lib/auth/AuthContext';
import { useRouter } from '@/i18n/navigation';
import { useEffect, useState, useCallback } from 'react';
import type { AdminCategoryDto } from '@bun-bun/shared';
import {
  getAdminCategories,
  createAdminCategory,
  updateAdminCategory,
  deleteAdminCategory,
} from '@/lib/api/admin';

interface CategoryFormData {
  name: string;
  nameRu: string;
  nameRo: string;
  imageUrl: string;
  parentId: string;
}

const emptyForm: CategoryFormData = {
  name: '',
  nameRu: '',
  nameRo: '',
  imageUrl: '',
  parentId: '',
};

export default function AdminCategoriesPage() {
  const t = useTranslations('admin.categories');
  const tc = useTranslations('common');
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const locale = useLocale();

  const [categories, setCategories] = useState<AdminCategoryDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState<CategoryFormData>(emptyForm);
  const [saving, setSaving] = useState(false);

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

  function getLocalizedName(cat: AdminCategoryDto) {
    if (locale === 'ru' && cat.nameRu) return cat.nameRu;
    if (locale === 'ro' && cat.nameRo) return cat.nameRo;
    return cat.name;
  }

  function startEdit(cat: AdminCategoryDto) {
    setEditingId(cat.id);
    setShowCreate(false);
    setForm({
      name: cat.name,
      nameRu: cat.nameRu || '',
      nameRo: cat.nameRo || '',
      imageUrl: cat.imageUrl || '',
      parentId: cat.parentId || '',
    });
  }

  function startCreate() {
    setEditingId(null);
    setShowCreate(true);
    setForm(emptyForm);
  }

  function cancelForm() {
    setEditingId(null);
    setShowCreate(false);
    setForm(emptyForm);
  }

  async function handleSave() {
    setSaving(true);
    setError('');
    try {
      const payload = {
        name: form.name,
        nameRu: form.nameRu || undefined,
        nameRo: form.nameRo || undefined,
        imageUrl: form.imageUrl || undefined,
        parentId: form.parentId || undefined,
      };

      if (editingId) {
        await updateAdminCategory(editingId, {
          ...payload,
          imageUrl: form.imageUrl || null,
          parentId: form.parentId || null,
        });
      } else {
        await createAdminCategory(payload);
      }
      cancelForm();
      await load();
    } catch {
      setError(tc('errorGeneric'));
    } finally {
      setSaving(false);
    }
  }

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
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1>{t('title')}</h1>
        <button
          onClick={startCreate}
          className="px-3 py-1.5 border-0 rounded bg-green-700 text-white text-sm hover:bg-green-800"
        >
          {t('add')}
        </button>
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {/* Create form */}
      {showCreate && (
        <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h3 className="mt-0">{t('add')}</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm block mb-1">{t('name')}</label>
              <input className="w-full" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <label className="text-sm block mb-1">{t('nameRu')}</label>
              <input className="w-full" value={form.nameRu} onChange={(e) => setForm({ ...form, nameRu: e.target.value })} />
            </div>
            <div>
              <label className="text-sm block mb-1">{t('nameRo')}</label>
              <input className="w-full" value={form.nameRo} onChange={(e) => setForm({ ...form, nameRo: e.target.value })} />
            </div>
            <div>
              <label className="text-sm block mb-1">{t('imageUrl')}</label>
              <input className="w-full" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
            </div>
            <div>
              <label className="text-sm block mb-1">{t('parent')}</label>
              <select className="w-full" value={form.parentId} onChange={(e) => setForm({ ...form, parentId: e.target.value })}>
                <option value="">—</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            <button
              onClick={handleSave}
              disabled={saving || !form.name}
              className="px-3 py-1.5 border-0 rounded bg-green-700 text-white text-sm hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? tc('loading') : tc('save')}
            </button>
            <button onClick={cancelForm} className="px-3 py-1.5 border border-gray-300 rounded bg-white text-sm hover:bg-gray-50">
              {tc('cancel')}
            </button>
          </div>
        </div>
      )}

      {categories.length === 0 ? (
        <p className="text-gray-500">{t('noCategories')}</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-200 text-left">
              <th className="p-2">{t('name')}</th>
              <th className="p-2">{t('nameRu')}</th>
              <th className="p-2">{t('nameRo')}</th>
              <th className="p-2">{t('image')}</th>
              <th className="p-2">{t('slug')}</th>
              <th className="p-2">{t('parent')}</th>
              <th className="p-2">{tc('actions')}</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id} className="border-b border-gray-200">
                {editingId === cat.id ? (
                  <>
                    <td className="p-2">
                      <input className="w-full max-w-[120px]" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    </td>
                    <td className="p-2">
                      <input className="w-full max-w-[120px]" value={form.nameRu} onChange={(e) => setForm({ ...form, nameRu: e.target.value })} />
                    </td>
                    <td className="p-2">
                      <input className="w-full max-w-[120px]" value={form.nameRo} onChange={(e) => setForm({ ...form, nameRo: e.target.value })} />
                    </td>
                    <td className="p-2">
                      <input className="w-full max-w-[120px]" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
                    </td>
                    <td className="p-2 text-gray-500">{cat.slug}</td>
                    <td className="p-2">
                      <select className="w-full max-w-[120px]" value={form.parentId} onChange={(e) => setForm({ ...form, parentId: e.target.value })}>
                        <option value="">—</option>
                        {categories.filter((c) => c.id !== cat.id).map((c) => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </td>
                    <td className="p-2">
                      <div className="flex gap-1">
                        <button
                          onClick={handleSave}
                          disabled={saving || !form.name}
                          className="px-3 py-1.5 border-0 rounded bg-green-700 text-white text-xs hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {tc('save')}
                        </button>
                        <button onClick={cancelForm} className="px-3 py-1.5 border border-gray-300 rounded bg-white text-xs hover:bg-gray-50">
                          {tc('cancel')}
                        </button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="p-2">{cat.name}</td>
                    <td className={`p-2 ${cat.nameRu ? '' : 'text-gray-400'}`}>{cat.nameRu || '—'}</td>
                    <td className={`p-2 ${cat.nameRo ? '' : 'text-gray-400'}`}>{cat.nameRo || '—'}</td>
                    <td className="p-2">
                      {cat.imageUrl ? (
                        <img src={cat.imageUrl} alt="" className="w-8 h-8 object-cover rounded" />
                      ) : '—'}
                    </td>
                    <td className="p-2 text-gray-500 text-sm">{cat.slug}</td>
                    <td className="p-2">{getParentName(cat.parentId)}</td>
                    <td className="p-2">
                      <div className="flex gap-1">
                        <button onClick={() => startEdit(cat)} className="px-3 py-1.5 border border-gray-300 rounded bg-white text-xs hover:bg-gray-50">
                          {tc('edit')}
                        </button>
                        <button onClick={() => handleDelete(cat.id)} className="px-3 py-1.5 border border-red-600 text-red-600 rounded bg-white text-xs hover:bg-red-50">
                          {tc('delete')}
                        </button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
