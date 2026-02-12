'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { FARMERS } from '@/data/farmers';

export function FarmersSection() {
  const t = useTranslations('home');

  return (
    <section className="w-full py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h2 className="text-xl font-bold text-gray-900">{t('ourFarmers')}</h2>
          <Link href="/products" className="text-green-700 font-semibold text-sm hover:underline">
            {t('viewAllFarmers')}
          </Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-thin">
          {FARMERS.map((farmer) => (
            <div
              key={farmer.id}
              className="shrink-0 w-72 bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-bold text-gray-900 mb-2">{t(farmer.nameKey)}</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-4">
                {t(farmer.descriptionKey)}
              </p>
              <Link
                href="/products"
                className="text-green-700 text-sm font-semibold hover:underline"
              >
                {t('readMore')}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
