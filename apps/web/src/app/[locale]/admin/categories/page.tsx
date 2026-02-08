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

  const inputStyle = {
    padding: '0.4rem 0.6rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '0.9rem',
    width: '100%',
  } as const;

  const btnStyle = {
    padding: '0.4rem 0.8rem',
    cursor: 'pointer',
    border: '1px solid #ccc',
    borderRadius: '4px',
    background: 'white',
    fontSize: '0.85rem',
  } as const;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h1>{t('title')}</h1>
        <button onClick={startCreate} style={{ ...btnStyle, background: '#4CAF50', color: 'white', border: 'none' }}>
          {t('add')}
        </button>
      </div>

      {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}

      {/* Create form */}
      {showCreate && (
        <div style={{ marginBottom: '1.5rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px', background: '#f9f9f9' }}>
          <h3 style={{ marginTop: 0 }}>{t('add')}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div>
              <label style={{ fontSize: '0.85rem', display: 'block', marginBottom: '0.25rem' }}>{t('name')}</label>
              <input style={inputStyle} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <label style={{ fontSize: '0.85rem', display: 'block', marginBottom: '0.25rem' }}>{t('nameRu')}</label>
              <input style={inputStyle} value={form.nameRu} onChange={(e) => setForm({ ...form, nameRu: e.target.value })} />
            </div>
            <div>
              <label style={{ fontSize: '0.85rem', display: 'block', marginBottom: '0.25rem' }}>{t('nameRo')}</label>
              <input style={inputStyle} value={form.nameRo} onChange={(e) => setForm({ ...form, nameRo: e.target.value })} />
            </div>
            <div>
              <label style={{ fontSize: '0.85rem', display: 'block', marginBottom: '0.25rem' }}>{t('imageUrl')}</label>
              <input style={inputStyle} value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
            </div>
            <div>
              <label style={{ fontSize: '0.85rem', display: 'block', marginBottom: '0.25rem' }}>{t('parent')}</label>
              <select style={inputStyle} value={form.parentId} onChange={(e) => setForm({ ...form, parentId: e.target.value })}>
                <option value="">—</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem' }}>
            <button onClick={handleSave} disabled={saving || !form.name} style={{ ...btnStyle, background: '#4CAF50', color: 'white', border: 'none' }}>
              {saving ? tc('loading') : tc('save')}
            </button>
            <button onClick={cancelForm} style={btnStyle}>{tc('cancel')}</button>
          </div>
        </div>
      )}

      {categories.length === 0 ? (
        <p style={{ color: '#999' }}>{t('noCategories')}</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #ddd', textAlign: 'left' }}>
              <th style={{ padding: '0.5rem' }}>{t('name')}</th>
              <th style={{ padding: '0.5rem' }}>{t('nameRu')}</th>
              <th style={{ padding: '0.5rem' }}>{t('nameRo')}</th>
              <th style={{ padding: '0.5rem' }}>{t('image')}</th>
              <th style={{ padding: '0.5rem' }}>{t('slug')}</th>
              <th style={{ padding: '0.5rem' }}>{t('parent')}</th>
              <th style={{ padding: '0.5rem' }}>{tc('actions')}</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id} style={{ borderBottom: '1px solid #eee' }}>
                {editingId === cat.id ? (
                  <>
                    <td style={{ padding: '0.5rem' }}>
                      <input style={{ ...inputStyle, width: '120px' }} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    </td>
                    <td style={{ padding: '0.5rem' }}>
                      <input style={{ ...inputStyle, width: '120px' }} value={form.nameRu} onChange={(e) => setForm({ ...form, nameRu: e.target.value })} />
                    </td>
                    <td style={{ padding: '0.5rem' }}>
                      <input style={{ ...inputStyle, width: '120px' }} value={form.nameRo} onChange={(e) => setForm({ ...form, nameRo: e.target.value })} />
                    </td>
                    <td style={{ padding: '0.5rem' }}>
                      <input style={{ ...inputStyle, width: '120px' }} value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
                    </td>
                    <td style={{ padding: '0.5rem', color: '#999' }}>{cat.slug}</td>
                    <td style={{ padding: '0.5rem' }}>
                      <select style={{ ...inputStyle, width: '120px' }} value={form.parentId} onChange={(e) => setForm({ ...form, parentId: e.target.value })}>
                        <option value="">—</option>
                        {categories.filter((c) => c.id !== cat.id).map((c) => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </td>
                    <td style={{ padding: '0.5rem' }}>
                      <div style={{ display: 'flex', gap: '0.3rem' }}>
                        <button onClick={handleSave} disabled={saving || !form.name} style={{ ...btnStyle, background: '#4CAF50', color: 'white', border: 'none', fontSize: '0.8rem' }}>
                          {tc('save')}
                        </button>
                        <button onClick={cancelForm} style={{ ...btnStyle, fontSize: '0.8rem' }}>{tc('cancel')}</button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td style={{ padding: '0.5rem' }}>{cat.name}</td>
                    <td style={{ padding: '0.5rem', color: cat.nameRu ? 'inherit' : '#ccc' }}>{cat.nameRu || '—'}</td>
                    <td style={{ padding: '0.5rem', color: cat.nameRo ? 'inherit' : '#ccc' }}>{cat.nameRo || '—'}</td>
                    <td style={{ padding: '0.5rem' }}>
                      {cat.imageUrl ? (
                        <img src={cat.imageUrl} alt="" style={{ width: 32, height: 32, objectFit: 'cover', borderRadius: 4 }} />
                      ) : '—'}
                    </td>
                    <td style={{ padding: '0.5rem', color: '#999', fontSize: '0.85rem' }}>{cat.slug}</td>
                    <td style={{ padding: '0.5rem' }}>{getParentName(cat.parentId)}</td>
                    <td style={{ padding: '0.5rem' }}>
                      <div style={{ display: 'flex', gap: '0.3rem' }}>
                        <button onClick={() => startEdit(cat)} style={{ ...btnStyle, fontSize: '0.8rem' }}>{tc('edit')}</button>
                        <button onClick={() => handleDelete(cat.id)} style={{ ...btnStyle, fontSize: '0.8rem', color: 'red', borderColor: 'red' }}>{tc('delete')}</button>
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
