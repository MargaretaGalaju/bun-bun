'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { CategoryDto } from '@bun-bun/shared';
import { getCategories } from '@/lib/api/categories';
import { useTranslations } from 'next-intl';

function getCategoryName(cat: CategoryDto, locale: string) {
  if (locale === 'ru' && cat.nameRu) return cat.nameRu;
  if (locale === 'ro' && cat.nameRo) return cat.nameRo;
  return cat.name;
}

const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400';

export function CategoryGrid() {
  const t = useTranslations('home');
  const locale = useLocale();
  const [categories, setCategories] = useState<CategoryDto[]>([]);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => {});
  }, []);

  return (
    <section className="w-full py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-xl font-bold text-gray-900 mb-6">{t('browseCategories')}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.slice(0, 12).map((cat) => (
            <Link
              key={cat.id}
              href={`/products?categoryId=${cat.id}`}
              className="group block rounded-xl overflow-hidden border border-gray-200 hover:border-green-500 hover:shadow-lg transition-all no-underline text-inherit"
            >
              <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
                {cat.imageUrl ? (
                  <img
                    src={cat.imageUrl}
                    alt={getCategoryName(cat, locale)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <img
                    src={PLACEHOLDER_IMAGE}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
              </div>
              <div className="p-3">
                <span className="text-sm font-semibold text-gray-900 line-clamp-2">
                  {getCategoryName(cat, locale)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
