'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useRouter, Link } from '@/i18n/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import type { ProductDto, ProductImageDto } from '@bun-bun/shared';
import {
  updateSellerProduct,
  addSellerProductImage,
  presignUpload,
  uploadFileToR2,
  listMySellerProducts,
} from '@/lib/api/products';
import { getCategories } from '@/lib/api/categories';
import type { CategoryDto } from '@bun-bun/shared';
import { updateProductSchema } from '@bun-bun/shared';
import CitySelect from '@/components/CitySelect';

export default function SellerEditProductPage() {
  const t = useTranslations('seller.products');
  const tc = useTranslations('common');
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [product, setProduct] = useState<ProductDto | null>(null);
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [titleRo, setTitleRo] = useState('');
  const [titleRu, setTitleRu] = useState('');
  const [descriptionRo, setDescriptionRo] = useState('');
  const [descriptionRu, setDescriptionRu] = useState('');
  const [price, setPrice] = useState('');
  const [city, setCity] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [images, setImages] = useState<ProductImageDto[]>([]);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isSeller = user?.role === 'SELLER';

  // Load product and categories
  useEffect(() => {
    if (authLoading || !isSeller) return;

    let cancelled = false;
    async function load() {
      try {
        const [allProducts, cats] = await Promise.all([listMySellerProducts(), getCategories()]);
        const found = allProducts.find((p) => p.id === id);
        if (!cancelled && found) {
          setProduct(found);
          setTitleRo(found.titleRo);
          setTitleRu(found.titleRu);
          setDescriptionRo(found.descriptionRo);
          setDescriptionRu(found.descriptionRu);
          setPrice(String(found.price));
          setCity(found.city || '');
          setCategoryId(found.categoryId);
          setImages(found.images || []);
        }
        if (!cancelled) setCategories(cats);
      } catch {
        if (!cancelled) setError(tc('errorGeneric'));
      } finally {
        if (!cancelled) setLoadingProduct(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [authLoading, isSeller, id, tc]);

  if (authLoading) return <p>{tc('loading')}</p>;

  if (!isSeller) {
    return (
      <div className="text-center mt-12">
        <p className="text-lg text-gray-500">{t('accessRequired')}</p>
      </div>
    );
  }

  if (loadingProduct) return <p>{tc('loading')}</p>;

  if (!product) {
    return (
      <div>
        <Link href="/seller/products" className="text-gray-600 no-underline hover:text-gray-800">
          ← {t('title')}
        </Link>
        <p className="mt-4 text-red-600">{tc('errorGeneric')}</p>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const payload: Record<string, unknown> = {};
    if (titleRo.trim() !== product!.titleRo) payload.titleRo = titleRo.trim();
    if (titleRu.trim() !== product!.titleRu) payload.titleRu = titleRu.trim();
    if (descriptionRo.trim() !== product!.descriptionRo) payload.descriptionRo = descriptionRo.trim();
    if (descriptionRu.trim() !== product!.descriptionRu) payload.descriptionRu = descriptionRu.trim();
    if (parseFloat(price) !== product!.price) payload.price = parseFloat(price);
    if (categoryId !== product!.categoryId) payload.categoryId = categoryId;
    const newCity = city || undefined;
    if (newCity !== (product!.city || undefined)) payload.city = newCity;

    if (Object.keys(payload).length === 0) {
      router.push('/seller/products');
      return;
    }

    const validation = updateProductSchema.safeParse(payload);
    if (!validation.success) {
      setError(
        t('validationError') + ': ' + validation.error.issues.map((i) => i.message).join(', '),
      );
      return;
    }

    setSubmitting(true);
    try {
      await updateSellerProduct(id, payload as any);
      router.push('/seller/products');
    } catch {
      setError(t('saveFailed'));
    } finally {
      setSubmitting(false);
    }
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Derive extension from mime type
    const extMap: Record<string, string> = {
      'image/jpeg': 'jpg',
      'image/png': 'png',
      'image/webp': 'webp',
    };
    const fileExt = extMap[file.type];
    if (!fileExt) {
      setError(t('uploadFailed'));
      return;
    }

    setUploading(true);
    setError(null);
    try {
      // Step 1: Get presigned URL
      const { uploadUrl, key } = await presignUpload(id, file.type, fileExt);
      // Step 2: Upload file directly to R2
      await uploadFileToR2(uploadUrl, file);
      // Step 3: Save image record in DB
      const img = await addSellerProductImage(id, key);
      setImages((prev) => [...prev, img]);
    } catch {
      setError(t('uploadFailed'));
    } finally {
      setUploading(false);
      // Reset file input
      e.target.value = '';
    }
  }

  return (
    <div className="max-w-[600px]">
      <Link href="/seller/products" className="text-gray-600 no-underline hover:text-gray-800">
        ← {t('title')}
      </Link>
      <h1 className="mt-2 mb-6">{t('editTitle')}</h1>

      {error && <p className="text-red-600 text-sm bg-red-50 rounded-md px-3 py-2 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block mb-1 font-semibold text-sm">{t('titleFieldRo')}</label>
          <input
            type="text"
            value={titleRo}
            onChange={(e) => setTitleRo(e.target.value)}
            required
            className="w-full"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold text-sm">{t('titleFieldRu')}</label>
          <input
            type="text"
            value={titleRu}
            onChange={(e) => setTitleRu(e.target.value)}
            required
            className="w-full"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold text-sm">{t('descriptionFieldRo')}</label>
          <textarea
            value={descriptionRo}
            onChange={(e) => setDescriptionRo(e.target.value)}
            required
            rows={3}
            className="w-full"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold text-sm">{t('descriptionFieldRu')}</label>
          <textarea
            value={descriptionRu}
            onChange={(e) => setDescriptionRu(e.target.value)}
            required
            rows={3}
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
          <CitySelect
            value={city}
            onChange={setCity}
            placeholder={t('selectCity')}
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
          {submitting ? t('saving') : t('save')}
        </button>
      </form>

      {/* Images section */}
      <div className="mt-8 border-t border-gray-200 pt-6">
        <h3 className="mb-4">{t('images')}</h3>

        {images.length > 0 && (
          <div className="flex gap-3 flex-wrap mb-4">
            {images.map((img) => (
              <img
                key={img.id}
                src={img.url}
                alt=""
                className="w-[120px] h-[90px] object-cover rounded-md border border-gray-200"
              />
            ))}
          </div>
        )}

        <div className="flex gap-2 items-center">
          <label
            className={`inline-flex items-center gap-2 py-2.5 px-4 rounded-md cursor-pointer whitespace-nowrap text-sm font-medium transition-colors ${
              uploading
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            {uploading ? t('uploading') : t('uploadImage')}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
          {uploading && <span className="text-gray-400 text-sm">{t('uploading')}</span>}
        </div>
      </div>
    </div>
  );
}
