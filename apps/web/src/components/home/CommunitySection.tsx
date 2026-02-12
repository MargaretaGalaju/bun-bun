'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export function CommunitySection() {
  const t = useTranslations('home');

  return (
    <section className="w-full py-12 bg-green-800 text-white">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h2 className="text-xl font-bold mb-2">{t('communityTitle')}</h2>
        <p className="text-green-100 font-medium mb-2">{t('communityTagline')}</p>
        <p className="text-sm text-green-100 mb-6">{t('communityBody')}</p>
        <Link
          href="/products"
          className="inline-block px-6 py-3 bg-white text-green-800 font-semibold rounded-lg hover:bg-green-50 transition-colors"
        >
          {t('communityCta')}
        </Link>
      </div>
    </section>
  );
}
