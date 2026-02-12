'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { ProductDto } from '@bun-bun/shared';
import { listPublicProducts } from '@/lib/api/products';
import { ProductCard } from '@/components/ProductCard';

export function PopularProducts() {
  const t = useTranslations('home');
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listPublicProducts({ sort: 'newest', limit: 8, page: 1 })
      .then((data) => setProducts(data.items))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="w-full py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h2 className="text-xl font-bold text-gray-900">{t('popularNow')}</h2>
          <Link href="/products" className="text-green-700 font-semibold text-sm hover:underline">
            {t('viewAll')}
          </Link>
        </div>
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600" />
          </div>
        ) : products.length === 0 ? (
          <p className="text-gray-500 text-center py-8">{t('noProducts')}</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {products.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
