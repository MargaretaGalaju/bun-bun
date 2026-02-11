'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, Link } from '@/i18n/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import {
  createAdminCategory,
  updateAdminCategory,
  getAdminCategories,
} from '@/lib/api/admin';
import type { AdminCategoryDto } from '@bun-bun/shared';
import Stepper from '@/components/Stepper';
import CategoryImageUploader from '@/components/CategoryImageUploader';

export default function AdminCreateCategoryPage() {
  const t = useTranslations('admin.categories');
  const tc = useTranslations('common');
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  // Wizard state
  const [step, setStep] = useState(0);
  const [category, setCategory] = useState<AdminCategoryDto | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // Step 1 form state
  const [categories, setCategories] = useState<AdminCategoryDto[]>([]);
  const [name, setName] = useState('');
  const [nameRu, setNameRu] = useState('');
  const [nameRo, setNameRo] = useState('');
  const [parentId, setParentId] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isAdmin = user?.role === 'ADMIN';

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      router.replace('/');
    }
  }, [authLoading, isAdmin, router]);

  useEffect(() => {
    if (isAdmin) {
      getAdminCategories().then(setCategories).catch(() => {});
    }
  }, [isAdmin]);

  if (authLoading) return <p>{tc('loading')}</p>;
  if (!isAdmin) return null;

  const stepLabels = [
    { label: t('stepDetails') },
    { label: t('stepImage') },
    { label: t('stepReview') },
  ];

  // ── Step 1: Create category ─────────────────────────────────

  async function handleCreateCategory(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const trimmedName = name.trim();
    if (!trimmedName) return;

    setSubmitting(true);
    try {
      const created = await createAdminCategory({
        name: trimmedName,
        nameRu: nameRu.trim() || undefined,
        nameRo: nameRo.trim() || undefined,
        parentId: parentId || undefined,
      });
      setCategory(created);
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
    if (category && url) {
      try {
        const updated = await updateAdminCategory(category.id, { imageUrl: url });
        setCategory(updated);
      } catch {
        // Image uploaded but failed to save URL - keep local state
      }
    }
    if (category && url === null) {
      try {
        const updated = await updateAdminCategory(category.id, { imageUrl: null });
        setCategory(updated);
      } catch {
        // silently fail
      }
    }
  }

  // ── Step 3: Done ────────────────────────────────────────────

  function handleDone() {
    router.push('/admin/categories');
  }

  // ── Helpers ─────────────────────────────────────────────────

  const parentName = categories.find((c) => c.id === parentId)?.name || null;

  return (
    <div className="max-w-[600px] mx-auto">
      <Link
        href="/admin/categories"
        className="text-gray-600 no-underline hover:text-gray-800"
      >
        ← {t('title')}
      </Link>
      <h1 className="mt-2 mb-6">{t('add')}</h1>

      <Stepper steps={stepLabels} currentStep={step} />

      {error && (
        <p className="text-red-600 text-sm bg-red-50 rounded-md px-3 py-2 mb-4">
          {error}
        </p>
      )}

      {/* ── Step 1: Category Details ───────────────────────────── */}
      {step === 0 && (
        <form onSubmit={handleCreateCategory} className="flex flex-col gap-4">
          <div>
            <label className="block mb-1 font-semibold text-sm">
              {t('name')} *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-sm">
              {t('nameRu')}
            </label>
            <input
              type="text"
              value={nameRu}
              onChange={(e) => setNameRu(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-sm">
              {t('nameRo')}
            </label>
            <input
              type="text"
              value={nameRo}
              onChange={(e) => setNameRo(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-sm">
              {t('parent')}
            </label>
            <select
              value={parentId}
              onChange={(e) => setParentId(e.target.value)}
              className="w-full"
            >
              <option value="">—</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
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
      {step === 1 && category && (
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
      {step === 2 && category && (
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
            </div>

            {/* Image preview */}
            {imageUrl && (
              <div className="mt-4 pt-3 border-t border-gray-100">
                <span className="text-sm text-gray-500 block mb-2">
                  {t('image')}
                </span>
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
