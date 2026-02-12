'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { ProductDto } from '@bun-bun/shared';
import { listPublicProducts } from '@/lib/api/products';
import { ProductCard } from '@/components/ProductCard';

export function SeasonalProducts() {
  const t = useTranslations('home');
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listPublicProducts({ sort: 'newest', limit: 12, page: 1 })
      .then((data) => setProducts(data.items))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="w-full py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-xl font-bold text-gray-900 mb-2">{t('seasonalTitle')}</h2>
        <p className="text-gray-600 text-sm mb-6">{t('seasonalDesc')}</p>
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600" />
          </div>
        ) : products.length === 0 ? (
          <p className="text-gray-500">{t('noProducts')}</p>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4">
            {products.map((product) => (
              <div key={product.id} className="shrink-0 w-44 sm:w-52">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
