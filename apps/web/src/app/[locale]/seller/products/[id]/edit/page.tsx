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

export default function SellerEditProductPage() {
  const t = useTranslations('seller.products');
  const tc = useTranslations('common');
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [product, setProduct] = useState<ProductDto | null>(null);
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
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
        const [allProducts, cats] = await Promise.all([
          listMySellerProducts(),
          getCategories(),
        ]);
        const found = allProducts.find((p) => p.id === id);
        if (!cancelled && found) {
          setProduct(found);
          setTitle(found.title);
          setDescription(found.description);
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
    return () => { cancelled = true; };
  }, [authLoading, isSeller, id, tc]);

  if (authLoading) return <p>{tc('loading')}</p>;

  if (!isSeller) {
    return (
      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <p style={{ fontSize: '1.1rem', color: '#666' }}>{t('accessRequired')}</p>
      </div>
    );
  }

  if (loadingProduct) return <p>{tc('loading')}</p>;

  if (!product) {
    return (
      <div>
        <Link href="/seller/products" style={{ color: '#555', textDecoration: 'none' }}>
          ← {t('title')}
        </Link>
        <p style={{ marginTop: '1rem', color: '#e53e3e' }}>{tc('errorGeneric')}</p>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const payload: Record<string, unknown> = {};
    if (title.trim() !== product!.title) payload.title = title.trim();
    if (description.trim() !== product!.description) payload.description = description.trim();
    if (parseFloat(price) !== product!.price) payload.price = parseFloat(price);
    if (categoryId !== product!.categoryId) payload.categoryId = categoryId;
    const trimmedCity = city.trim() || undefined;
    if (trimmedCity !== (product!.city || undefined)) payload.city = trimmedCity;

    if (Object.keys(payload).length === 0) {
      router.push('/seller/products');
      return;
    }

    const validation = updateProductSchema.safeParse(payload);
    if (!validation.success) {
      setError(t('validationError') + ': ' + validation.error.issues.map((i) => i.message).join(', '));
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
      <h1 style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}>{t('editTitle')}</h1>

      {error && (
        <p style={{ color: '#e53e3e', padding: '0.75rem', background: '#fff5f5', borderRadius: '6px', marginBottom: '1rem' }}>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label style={labelStyle}>{t('titleField')}</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>{t('descriptionField')}</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows={4} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>{t('priceField')}</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required min={0.01} step={0.01} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>{t('cityField')}</label>
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>{t('categoryField')}</label>
          <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required style={inputStyle}>
            <option value="">{t('selectCategory')}</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
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
          {submitting ? t('saving') : t('save')}
        </button>
      </form>

      {/* Images section */}
      <div style={{ marginTop: '2rem', borderTop: '1px solid #eee', paddingTop: '1.5rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>{t('images')}</h3>

        {images.length > 0 && (
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            {images.map((img) => (
              <img
                key={img.id}
                src={img.url}
                alt=""
                style={{ width: '120px', height: '90px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #eee' }}
              />
            ))}
          </div>
        )}

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <label
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.6rem 1rem',
              background: uploading ? '#999' : '#333',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: uploading ? 'default' : 'pointer',
              whiteSpace: 'nowrap',
              fontSize: '0.95rem',
            }}
          >
            {uploading ? t('uploading') : t('uploadImage')}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileUpload}
              disabled={uploading}
              style={{ display: 'none' }}
            />
          </label>
          {uploading && <span style={{ color: '#999', fontSize: '0.85rem' }}>{t('uploading')}</span>}
        </div>
      </div>
    </div>
  );
}
