'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { ProductDto } from '@bun-bun/shared';
import { getPublicProduct } from '@/lib/api/products';
import { useCart } from '@/features/cart/CartContext';

export default function ProductDetailPage() {
  const t = useTranslations('products');
  const tc = useTranslations('common');
  const params = useParams();
  const id = params.id as string;
  const { addItem } = useCart();

  const [product, setProduct] = useState<ProductDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const data = await getPublicProduct(id);
        if (!cancelled) setProduct(data);
      } catch {
        if (!cancelled) setError(t('notFound'));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [id, t]);

  function handleAddToCart() {
    if (!product) return;
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  if (loading) return <p>{t('empty')}</p>;
  if (error || !product) {
    return (
      <div>
        <Link href="/products" className="text-gray-600">{t('backToCatalog')}</Link>
        <p className="mt-4 text-red-600">{error || t('notFound')}</p>
      </div>
    );
  }

  return (
    <div>
      <Link href="/products" className="text-gray-600 no-underline">
        {t('backToCatalog')}
      </Link>

      <h1 className="mt-4 mb-2">{product.title}</h1>

      {product.city && (
        <p className="text-gray-500 text-sm mb-2">{product.city}</p>
      )}

      <p className="text-2xl font-bold text-green-700 mb-4">
        {t('price', { price: product.price.toFixed(2) })}
      </p>

      {/* Add to cart */}
      <div className="flex items-center gap-3 mb-6">
        {added ? (
          <>
            <span className="text-green-700 font-semibold">{tc('added')}</span>
            <Link href="/cart" className="text-green-700">{tc('goToCart')}</Link>
          </>
        ) : (
          <button
            onClick={handleAddToCart}
            className="px-6 py-2.5 bg-green-700 text-white border-none rounded-md cursor-pointer font-semibold text-base"
          >
            {tc('addToCart')}
          </button>
        )}
      </div>

      {/* Images */}
      {product.images && product.images.length > 0 && (
        <div className="flex gap-3 overflow-x-auto mb-6 pb-2">
          {product.images.map((img) => (
            <img
              key={img.id}
              src={img.url}
              alt={product.title}
              className="w-[280px] h-[200px] object-cover rounded-lg shrink-0"
            />
          ))}
        </div>
      )}

      <h3>{t('description')}</h3>
      <p className="leading-relaxed text-gray-700 whitespace-pre-wrap">
        {product.description}
      </p>
    </div>
  );
}
