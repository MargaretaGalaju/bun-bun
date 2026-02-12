'use client';

import { useTranslations } from 'next-intl';

export function DeliveryScheduleBanner() {
  const t = useTranslations('home');

  return (
    <div className="w-full py-3 bg-green-800 text-white text-center text-sm font-medium">
      {t('deliverySchedule')}
    </div>
  );
}
