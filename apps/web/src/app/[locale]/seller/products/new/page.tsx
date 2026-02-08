'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { Link } from '@/i18n/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import { createSellerProduct } from '@/lib/api/products';
import { getCategories, type CategoryDto } from '@/lib/api/categories';
import { createProductSchema } from '@bun-bun/shared';

export default function SellerCreateProductPage() {
  const t = useTranslations('seller.products');
  const tc = useTranslations('common');
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [city, setCity] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isSeller = user?.role === 'SELLER';

  useEffect(() => {
    getCategories().then(setCategories).catch(() => {});
  }, []);

  if (authLoading) return <p>{tc('loading')}</p>;

  if (!isSeller) {
    return (
      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <p style={{ fontSize: '1.1rem', color: '#666' }}>{t('accessRequired')}</p>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const payload = {
      title: title.trim(),
      description: description.trim(),
      price: parseFloat(price),
      categoryId,
      city: city.trim() || undefined,
    };

    const validation = createProductSchema.safeParse(payload);
    if (!validation.success) {
      setError(t('validationError') + ': ' + validation.error.issues.map((i) => i.message).join(', '));
      return;
    }

    setSubmitting(true);
    try {
      await createSellerProduct(payload);
      router.push('/seller/products');
    } catch {
      setError(t('saveFailed'));
    } finally {
      setSubmitting(false);
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '0.6rem',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '0.95rem',
    boxSizing: 'border-box' as const,
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.3rem',
    fontWeight: 600 as const,
    fontSize: '0.9rem',
  };

  return (
    <div style={{ maxWidth: '600px' }}>
      <Link href="/seller/products" style={{ color: '#555', textDecoration: 'none' }}>
        ← {t('title')}
      </Link>
      <h1 style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}>{t('create')}</h1>

      {error && (
        <p style={{ color: '#e53e3e', padding: '0.75rem', background: '#fff5f5', borderRadius: '6px', marginBottom: '1rem' }}>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label style={labelStyle}>{t('titleField')}</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>{t('descriptionField')}</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>{t('priceField')}</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min={0.01}
            step={0.01}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>{t('cityField')}</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>{t('categoryField')}</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
            style={inputStyle}
          >
            <option value="">{t('selectCategory')}</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={submitting}
          style={{
            padding: '0.7rem',
            background: submitting ? '#999' : '#2d6a4f',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 600,
            cursor: submitting ? 'default' : 'pointer',
            fontSize: '1rem',
          }}
        >
          {submitting ? t('creating') : t('create')}
        </button>
      </form>
    </div>
  );
}
