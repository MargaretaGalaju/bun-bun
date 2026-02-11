'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { Link } from '@/i18n/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import { createSellerProduct } from '@/lib/api/products';
import { getCategories } from '@/lib/api/categories';
import type { CategoryDto } from '@bun-bun/shared';
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
      <div className="text-center mt-12">
        <p className="text-lg text-gray-500">{t('accessRequired')}</p>
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

  return (
    <div className="max-w-[600px]">
      <Link href="/seller/products" className="text-gray-600 no-underline hover:text-gray-800">
        ← {t('title')}
      </Link>
      <h1 className="mt-2 mb-6">{t('create')}</h1>

      {error && (
        <p className="text-red-600 text-sm bg-red-50 rounded-md px-3 py-2 mb-4">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block mb-1 font-semibold text-sm">{t('titleField')}</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold text-sm">{t('descriptionField')}</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
            className="w-full"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold text-sm">{t('priceField')}</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min={0.01}
            step={0.01}
            className="w-full"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold text-sm">{t('cityField')}</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold text-sm">{t('categoryField')}</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
            className="w-full"
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
          className="w-full py-2.5 bg-green-700 text-white font-semibold rounded-md hover:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? t('creating') : t('create')}
        </button>
      </form>
    </div>
  );
}
