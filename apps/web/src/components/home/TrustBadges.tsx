'use client';

import { useTranslations } from 'next-intl';

const BADGE_ICONS = ['🌱', '📍', '🌍', '🚚'];

export function TrustBadges() {
  const t = useTranslations('home');

  const badges = [
    { key: 'trustFair' as const },
    { key: 'trustLocal' as const },
    { key: 'trustEarth' as const },
    { key: 'trustDelivery' as const },
  ];

  return (
    <section className="w-full py-12 bg-gray-50 border-y border-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-center text-gray-700 font-medium mb-8">{t('trustHeadline')}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge, i) => (
            <div key={badge.key} className="flex flex-col items-center text-center p-4">
              <span className="text-3xl mb-2">{BADGE_ICONS[i]}</span>
              <span className="text-sm font-semibold text-gray-900">{t(badge.key)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
