'use client';

import { useTranslations } from 'next-intl';

interface FilterSidebarProps {
  minPrice: string;
  maxPrice: string;
  onMinPriceChange: (val: string) => void;
  onMaxPriceChange: (val: string) => void;
  sort: string;
  onSortChange: (val: string) => void;
  totalProducts: number;
}

export function FilterSidebar({
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
  sort,
  onSortChange,
  totalProducts,
}: FilterSidebarProps) {
  const t = useTranslations('home');

  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      {/* Product count */}
      <div className="mb-4 text-sm text-gray-500">
        {t('productCount', { count: totalProducts })}
      </div>

      {/* Filter header */}
      <div className="border border-gray-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
          {t('filter')}
        </h3>

        {/* Sort */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {t('sortBy')}
          </label>
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
          >
            <option value="newest">{t('sortNewest')}</option>
            <option value="oldest">{t('sortOldest')}</option>
            <option value="price_asc">{t('sortPriceAsc')}</option>
            <option value="price_desc">{t('sortPriceDesc')}</option>
          </select>
        </div>

        {/* Price range */}
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {t('priceRange')}
          </label>
          <div className="flex gap-2 items-center">
            <input
              type="number"
              placeholder={t('priceFrom')}
              value={minPrice}
              onChange={(e) => onMinPriceChange(e.target.value)}
              min={0}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
            />
            <span className="text-gray-400 text-sm">—</span>
            <input
              type="number"
              placeholder={t('priceTo')}
              value={maxPrice}
              onChange={(e) => onMaxPriceChange(e.target.value)}
              min={0}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
