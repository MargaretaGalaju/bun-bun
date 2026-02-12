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

export function TopCategories() {
  const t = useTranslations('home');
  const locale = useLocale();
  const [categories, setCategories] = useState<CategoryDto[]>([]);

  useEffect(() => {
    getCategories()
      .then((list) => setCategories(list.slice(0, 8)))
      .catch(() => {});
  }, []);

  const display = categories.slice(0, 8);

  return (
    <section className="w-full bg-gray-50 border-b border-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-xl font-bold text-gray-900 mb-6">{t('topCategories')}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {display.map((cat) => (
            <Link
              key={cat.id}
              href={`/products?categoryId=${cat.id}`}
              className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-gray-200 hover:border-green-500 hover:shadow-md transition-all no-underline text-inherit"
            >
              <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                {cat.imageUrl ? (
                  <img
                    src={cat.imageUrl}
                    alt={getCategoryName(cat, locale)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl">🛒</div>
                )}
              </div>
              <span className="text-xs text-center font-medium text-gray-700 line-clamp-2">
                {getCategoryName(cat, locale)}
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link href="/products" className="text-green-700 font-semibold text-sm hover:underline">
            {t('viewAllCategories')}
          </Link>
        </div>
      </div>
    </section>
  );
}
