'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export function AboutSection() {
  const t = useTranslations('home');

  return (
    <section className="w-full py-14 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              {t('aboutHeadline')}
            </h2>
            <p className="text-lg text-green-800 font-medium mb-4">{t('aboutSubheadline')}</p>
            <p className="text-gray-600 mb-6 leading-relaxed">{t('aboutBody')}</p>
            <Link href="/contact" className="text-green-700 font-semibold hover:underline">
              {t('aboutCta')}
            </Link>
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800"
              alt=""
              className="w-full h-72 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
