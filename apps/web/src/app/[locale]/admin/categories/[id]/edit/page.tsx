'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useRouter, Link } from '@/i18n/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import { updateAdminCategory, getAdminCategories } from '@/lib/api/admin';
import type { AdminCategoryDto } from '@bun-bun/shared';
import Stepper from '@/components/Stepper';
import CategoryImageUploader from '@/components/CategoryImageUploader';

export default function AdminEditCategoryPage() {
  const t = useTranslations('admin.categories');
  const tc = useTranslations('common');
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  // Wizard state
  const [step, setStep] = useState(0);
  const [category, setCategory] = useState<AdminCategoryDto | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loadingCategory, setLoadingCategory] = useState(true);

  // Step 1 form state
  const [categories, setCategories] = useState<AdminCategoryDto[]>([]);
  const [name, setName] = useState('');
  const [nameRu, setNameRu] = useState('');
  const [nameRo, setNameRo] = useState('');
  const [parentId, setParentId] = useState('');
  const [rating, setRating] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isAdmin = user?.role === 'ADMIN';

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      router.replace('/');
    }
  }, [authLoading, isAdmin, router]);

  // Load category and all categories
  useEffect(() => {
    if (!isAdmin) return;

    let cancelled = false;
    async function load() {
      try {
        const allCategories = await getAdminCategories();
        if (cancelled) return;
        setCategories(allCategories);

        const found = allCategories.find((c) => c.id === id);
        if (found) {
          setCategory(found);
          setName(found.name);
          setNameRu(found.nameRu || '');
          setNameRo(found.nameRo || '');
          setParentId(found.parentId || '');
          setRating(found.rating);
          setImageUrl(found.imageUrl || null);
        }
      } catch {
        if (!cancelled) setError(tc('errorGeneric'));
      } finally {
        if (!cancelled) setLoadingCategory(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [isAdmin, id, tc]);

  if (authLoading || loadingCategory) return <p>{tc('loading')}</p>;
  if (!isAdmin) return null;

  if (!category) {
    return (
      <div>
        <Link href="/admin/categories" className="text-gray-600 no-underline hover:text-gray-800">
          ← {t('title')}
        </Link>
        <p className="mt-4 text-red-600">{tc('errorGeneric')}</p>
      </div>
    );
  }

  const stepLabels = [
    { label: t('stepDetails') },
    { label: t('stepImage') },
    { label: t('stepReview') },
  ];

  // ── Step 1: Update category details ───────────────────────────

  async function handleUpdateDetails(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const trimmedName = name.trim();
    if (!trimmedName) return;

    const payload: Record<string, unknown> = {};
    if (trimmedName !== category!.name) payload.name = trimmedName;
    if ((nameRu.trim() || undefined) !== (category!.nameRu || undefined))
      payload.nameRu = nameRu.trim() || undefined;
    if ((nameRo.trim() || undefined) !== (category!.nameRo || undefined))
      payload.nameRo = nameRo.trim() || undefined;
    if ((parentId || null) !== (category!.parentId || null)) payload.parentId = parentId || null;
    if (rating !== category!.rating) payload.rating = rating;

    if (Object.keys(payload).length === 0) {
      setStep(1);
      return;
    }

    setSubmitting(true);
    try {
      const updated = await updateAdminCategory(category!.id, payload as any);
      setCategory(updated);
      setStep(1);
    } catch {
      setError(tc('errorGeneric'));
    } finally {
      setSubmitting(false);
    }
  }

  // ── Step 2: Handle image change ─────────────────────────────

  async function handleImageChange(url: string | null) {
    setImageUrl(url);
    if (url !== undefined) {
      try {
        const updated = await updateAdminCategory(category!.id, { imageUrl: url });
        setCategory(updated);
      } catch {
        // keep local state
      }
    }
  }

  // ── Step 3: Done ────────────────────────────────────────────

  function handleDone() {
    router.push('/admin/categories');
  }

  // ── Helpers ─────────────────────────────────────────────────

  const parentName =
    categories.find((c) => c.id === (category?.parentId || parentId))?.name || null;

  return (
    <div className="max-w-[600px] mx-auto">
      <Link href="/admin/categories" className="text-gray-600 no-underline hover:text-gray-800">
        ← {t('title')}
      </Link>
      <h1 className="mt-2 mb-6">{t('editTitle')}</h1>

      <Stepper steps={stepLabels} currentStep={step} />

      {error && <p className="text-red-600 text-sm bg-red-50 rounded-md px-3 py-2 mb-4">{error}</p>}

      {/* ── Step 1: Category Details ───────────────────────────── */}
      {step === 0 && (
        <form onSubmit={handleUpdateDetails} className="flex flex-col gap-4">
          <div>
            <label className="block mb-1 font-semibold text-sm">{t('name')} *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-sm">{t('nameRu')}</label>
            <input
              type="text"
              value={nameRu}
              onChange={(e) => setNameRu(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-sm">{t('nameRo')}</label>
            <input
              type="text"
              value={nameRo}
              onChange={(e) => setNameRo(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-sm">{t('parent')}</label>
            <select
              value={parentId}
              onChange={(e) => setParentId(e.target.value)}
              className="w-full"
            >
              <option value="">—</option>
              {categories
                .filter((cat) => cat.id !== id)
                .map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-semibold text-sm">{t('rating')} (1-100)</label>
            <input
              type="number"
              min="1"
              max="100"
              value={rating}
              onChange={(e) => setRating(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
              className="w-full"
            />
          </div>

          <button
            type="submit"
            disabled={submitting || !name.trim()}
            className="w-full py-2.5 bg-green-700 text-white font-semibold rounded-md hover:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? tc('loading') : t('nextStep')}
          </button>
        </form>
      )}

      {/* ── Step 2: Upload Image ───────────────────────────────── */}
      {step === 1 && (
        <div className="flex flex-col gap-6">
          <CategoryImageUploader
            categoryId={category.id}
            imageUrl={imageUrl}
            onImageChange={handleImageChange}
            t={t}
          />

          <div className="flex gap-3">
            <button
              onClick={() => setStep(2)}
              className="flex-1 py-2.5 bg-green-700 text-white font-semibold rounded-md hover:bg-green-800 transition-colors"
            >
              {t('nextStep')}
            </button>
            <button
              onClick={() => setStep(2)}
              className="py-2.5 px-5 border border-gray-300 text-gray-600 font-medium rounded-md hover:bg-gray-50 transition-colors"
            >
              {t('skipImage')}
            </button>
          </div>
        </div>
      )}

      {/* ── Step 3: Review ─────────────────────────────────────── */}
      {step === 2 && (
        <div className="flex flex-col gap-6">
          {/* Summary card */}
          <div className="border border-gray-200 rounded-lg p-5">
            <h3 className="text-lg font-semibold mb-3">{t('categorySummary')}</h3>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">{t('name')}</span>
                <span className="font-medium">{category.name}</span>
              </div>
              {category.nameRu && (
                <div className="flex justify-between">
                  <span className="text-gray-500">{t('nameRu')}</span>
                  <span className="font-medium">{category.nameRu}</span>
                </div>
              )}
              {category.nameRo && (
                <div className="flex justify-between">
                  <span className="text-gray-500">{t('nameRo')}</span>
                  <span className="font-medium">{category.nameRo}</span>
                </div>
              )}
              {parentName && (
                <div className="flex justify-between">
                  <span className="text-gray-500">{t('parent')}</span>
                  <span className="font-medium">{parentName}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-500">{t('rating')}</span>
                <span className="font-medium">{category.rating}</span>
              </div>
            </div>

            {/* Image preview */}
            {imageUrl && (
              <div className="mt-4 pt-3 border-t border-gray-100">
                <span className="text-sm text-gray-500 block mb-2">{t('image')}</span>
                <img
                  src={imageUrl}
                  alt=""
                  className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                />
              </div>
            )}
          </div>

          {/* Action button */}
          <button
            onClick={handleDone}
            className="w-full py-2.5 bg-green-700 text-white font-semibold rounded-md hover:bg-green-800 transition-colors"
          >
            {t('done')}
          </button>

          <button
            onClick={() => setStep(1)}
            className="text-sm text-gray-500 hover:text-gray-700 self-start"
          >
            ← {t('backToImage')}
          </button>
        </div>
      )}
    </div>
  );
}
