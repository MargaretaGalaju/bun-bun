'use client';

import { useTranslations } from 'next-intl';

export function AppDownloadSection() {
  const t = useTranslations('home');

  return (
    <section className="w-full py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a
            href="#"
            className="flex items-center gap-4 p-6 rounded-xl border-2 border-gray-200 hover:border-green-500 hover:shadow-md transition-all no-underline text-inherit"
          >
            <span className="text-4xl">📱</span>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">{t('appIosTitle')}</h3>
              <p className="text-sm text-gray-600 mb-3">{t('appIosDesc')}</p>
              <span className="inline-block px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg">
                {t('downloadIos')}
              </span>
            </div>
          </a>
          <a
            href="#"
            className="flex items-center gap-4 p-6 rounded-xl border-2 border-gray-200 hover:border-green-500 hover:shadow-md transition-all no-underline text-inherit"
          >
            <span className="text-4xl">🤖</span>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">{t('appAndroidTitle')}</h3>
              <p className="text-sm text-gray-600 mb-3">{t('appAndroidDesc')}</p>
              <span className="inline-block px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg">
                {t('downloadAndroid')}
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
