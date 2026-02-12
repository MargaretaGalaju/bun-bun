'use client';

import { useTranslations } from 'next-intl';

export function DeliveryTopBanner() {
  const t = useTranslations('home');

  return (
    <div className="w-full bg-green-800 text-white text-center py-2 text-sm font-medium">
      {t('deliveryBanner')}
    </div>
  );
}
