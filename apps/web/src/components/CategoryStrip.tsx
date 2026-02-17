'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import type { CategoryDto } from '@bun-bun/shared';
import { getCategories } from '@/lib/api/categories';

interface CategoryStripProps {
  activeCategoryId: string | null;
  onSelect: (categoryId: string | null) => void;
  /** Translated label for "All categories" (e.g. "Toate categoriile", "Все категории") */
  allCategoriesLabel?: string;
}

export function CategoryStrip({
  activeCategoryId,
  onSelect,
  allCategoriesLabel,
}: CategoryStripProps) {
  const locale = useLocale();
  const [categories, setCategories] = useState<CategoryDto[]>([]);

  useEffect(() => {
    getCategories()
      .then((list) =>
        setCategories(list.filter((c) => !c.parentId).sort((a, b) => b.rating - a.rating)),
      )
      .catch(() => {});
  }, []);

  function getCategoryName(cat: CategoryDto) {
    if (locale === 'ru' && cat.nameRu) return cat.nameRu;
    if (locale === 'ro' && cat.nameRo) return cat.nameRo;
    return cat.name;
  }

  const hasAllButton = allCategoriesLabel != null;

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-4 min-w-max justify-center">
        {hasAllButton && (
          <button
            type="button"
            onClick={() => onSelect(null)}
            className={`
              flex flex-col items-center gap-2 min-w-[90px] p-2 rounded-xl
              transition-all duration-200 cursor-pointer border-2
              ${
                activeCategoryId === null || activeCategoryId === ''
                  ? 'border-green-700 bg-green-50 shadow-md'
                  : 'border-transparent hover:border-gray-200 hover:bg-gray-50'
              }
            `}
          >
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 flex items-center justify-center text-gray-500 text-2xl">
              ☰
            </div>
            <span
              className={`text-xs text-center leading-tight font-medium max-w-[80px] ${
                activeCategoryId === null || activeCategoryId === ''
                  ? 'text-green-800'
                  : 'text-gray-700'
              }`}
            >
              {allCategoriesLabel}
            </span>
          </button>
        )}
        {categories.map((cat) => {
          const isActive = activeCategoryId === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelect(isActive ? null : cat.id)}
              className={`
                flex flex-col items-center gap-2 min-w-[90px] p-2 rounded-xl
                transition-all duration-200 cursor-pointer border-2
                ${
                  isActive
                    ? 'border-green-700 bg-green-50 shadow-md'
                    : 'border-transparent hover:border-gray-200 hover:bg-gray-50'
                }
              `}
            >
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                {cat.imageUrl ? (
                  <img
                    src={cat.imageUrl}
                    alt={getCategoryName(cat)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-2xl">
                    🛒
                  </div>
                )}
              </div>
              <span
                className={`text-xs text-center leading-tight font-medium max-w-[80px] line-clamp-2 ${
                  isActive ? 'text-green-800' : 'text-gray-700'
                }`}
              >
                {getCategoryName(cat)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
