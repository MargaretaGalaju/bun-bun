'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export function HeroSection() {
  const t = useTranslations('home');

  return (
    <section
      className="relative w-full min-h-[320px] md:min-h-[400px] flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(22, 101, 52, 0.4), rgba(22, 101, 52, 0.3)), url(https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200)`,
      }}
    >
      <div className="max-w-4xl mx-auto px-4 text-center text-white">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 drop-shadow-md">
          {t('heroHeadline')}
        </h1>
        <p className="text-lg md:text-xl text-white/95 mb-6 drop-shadow">{t('heroSubheadline')}</p>
        <Link
          href="/products"
          className="inline-block px-8 py-4 bg-white text-green-800 font-semibold rounded-lg shadow-lg hover:bg-green-50 transition-colors"
        >
          {t('heroCta')}
        </Link>
      </div>
    </section>
  );
}
