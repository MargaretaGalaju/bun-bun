'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { Link } from '@/i18n/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import {
  createSellerProduct,
  setSellerProductStatus,
} from '@/lib/api/products';
import { getCategories } from '@/lib/api/categories';
import type { CategoryDto, ProductDto, ProductImageDto } from '@bun-bun/shared';
import { createProductSchema } from '@bun-bun/shared';
import Stepper from '@/components/Stepper';
import ImageUploader from '@/components/ImageUploader';

export default function SellerCreateProductPage() {
  const t = useTranslations('seller.products');
  const tc = useTranslations('common');
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  // Wizard state
  const [step, setStep] = useState(0);
  const [product, setProduct] = useState<ProductDto | null>(null);
  const [images, setImages] = useState<ProductImageDto[]>([]);

  // Step 1 form state
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [city, setCity] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Step 3 state
  const [publishing, setPublishing] = useState(false);

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

  const stepLabels = [
    { label: t('stepDetails') },
    { label: t('stepPhotos') },
    { label: t('stepPublish') },
  ];

  // ── Step 1: Create product ──────────────────────────────────

  async function handleCreateProduct(e: React.FormEvent) {
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
      setError(
        t('validationError') +
          ': ' +
          validation.error.issues.map((i) => i.message).join(', '),
      );
      return;
    }

    setSubmitting(true);
    try {
      const created = await createSellerProduct(payload);
      setProduct(created);
      setStep(1);
    } catch {
      setError(t('saveFailed'));
    } finally {
      setSubmitting(false);
    }
  }

  // ── Step 3: Publish ─────────────────────────────────────────

  async function handlePublish() {
    if (!product) return;
    setPublishing(true);
    setError(null);
    try {
      await setSellerProductStatus(product.id, 'ACTIVE');
      router.push('/seller/products');
    } catch {
      setError(t('saveFailed'));
      setPublishing(false);
    }
  }

  function handleKeepDraft() {
    router.push('/seller/products');
  }

  // ── Category name lookup ────────────────────────────────────

  const categoryName =
    categories.find((c) => c.id === categoryId)?.name || categoryId;

  return (
    <div className="max-w-[600px] mx-auto">
      <Link
        href="/seller/products"
        className="text-gray-600 no-underline hover:text-gray-800"
      >
        ← {t('title')}
      </Link>
      <h1 className="mt-2 mb-6">{t('create')}</h1>

      <Stepper steps={stepLabels} currentStep={step} />

      {error && (
        <p className="text-red-600 text-sm bg-red-50 rounded-md px-3 py-2 mb-4">
          {error}
        </p>
      )}

      {/* ── Step 1: Product Details ────────────────────────────── */}
      {step === 0 && (
        <form onSubmit={handleCreateProduct} className="flex flex-col gap-4">
          <div>
            <label className="block mb-1 font-semibold text-sm">
              {t('titleField')}
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-sm">
              {t('descriptionField')}
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
              className="w-full"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-sm">
              {t('priceField')}
            </label>
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
            <label className="block mb-1 font-semibold text-sm">
              {t('cityField')}
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-sm">
              {t('categoryField')}
            </label>
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
            {submitting ? t('creating') : t('nextStep')}
          </button>
        </form>
      )}

      {/* ── Step 2: Upload Photos ──────────────────────────────── */}
      {step === 1 && product && (
        <div className="flex flex-col gap-6">
          <ImageUploader
            productId={product.id}
            images={images}
            onImagesChange={setImages}
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
              {t('skipPhotos')}
            </button>
          </div>
        </div>
      )}

      {/* ── Step 3: Publish / Keep Draft ───────────────────────── */}
      {step === 2 && product && (
        <div className="flex flex-col gap-6">
          {/* Product summary card */}
          <div className="border border-gray-200 rounded-lg p-5">
            <h3 className="text-lg font-semibold mb-3">{t('productSummary')}</h3>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">{t('titleField')}</span>
                <span className="font-medium">{product.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">{t('priceField')}</span>
                <span className="font-medium">{product.price.toFixed(2)} $</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">{t('categoryField')}</span>
                <span className="font-medium">{categoryName}</span>
              </div>
              {product.city && (
                <div className="flex justify-between">
                  <span className="text-gray-500">{t('cityField')}</span>
                  <span className="font-medium">{product.city}</span>
                </div>
              )}
              <div className="pt-1">
                <span className="text-gray-500">{t('descriptionField')}</span>
                <p className="mt-1 text-gray-700">{product.description}</p>
              </div>
            </div>

            {/* Thumbnail gallery */}
            {images.length > 0 && (
              <div className="mt-4 pt-3 border-t border-gray-100">
                <span className="text-sm text-gray-500 block mb-2">
                  {t('images')} ({images.length})
                </span>
                <div className="flex gap-2 flex-wrap">
                  {images.map((img) => (
                    <img
                      key={img.id}
                      src={img.url}
                      alt=""
                      className="w-16 h-16 object-cover rounded-md border border-gray-200"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handlePublish}
              disabled={publishing}
              className="w-full py-2.5 bg-green-700 text-white font-semibold rounded-md hover:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {publishing ? t('saving') : t('publishProduct')}
            </button>
            <button
              onClick={handleKeepDraft}
              disabled={publishing}
              className="w-full py-2.5 border border-gray-300 text-gray-600 font-medium rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              {t('keepDraft')}
            </button>
          </div>

          <button
            onClick={() => setStep(1)}
            disabled={publishing}
            className="text-sm text-gray-500 hover:text-gray-700 self-start"
          >
            ← {t('backToPhotos')}
          </button>
        </div>
      )}
    </div>
  );
}
