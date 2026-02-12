'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Footer } from '@/components/Footer';

const HERO_IMAGE_URL =
  'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200';

export default function ContactPage() {
  const t = useTranslations('footer');
  const tc = useTranslations('contactPage');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <section className="relative w-full h-64 md:h-80 overflow-hidden">
        <img
          src={HERO_IMAGE_URL}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="text-2xl md:text-4xl font-bold mb-2">{tc('title')}</h1>
          <p className="text-lg md:text-xl opacity-95">{tc('subtitle')}</p>
        </div>
      </section>

      {/* Contact details */}
      <section className="max-w-6xl mx-auto px-4 py-12 w-full">
        <div className="bg-gray-50 rounded-xl p-6 md:p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('contact')}</h2>
          <p className="text-gray-600 text-sm mb-1">{t('hours')}</p>
          <p className="text-gray-600 text-sm mb-1">{t('phone')}</p>
          <p className="text-gray-600 text-sm">{t('email')}</p>
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-6xl mx-auto px-4 pb-14 w-full">
        <div className="bg-gray-50 rounded-xl p-6 md:p-8 shadow-sm">
          <p className="text-sm font-semibold text-gray-900 mb-2">{t('newsletter')}</p>
          <p className="text-gray-600 text-sm mb-4">{t('newsletterDesc')}</p>
          {subscribed ? (
            <p className="text-green-600 text-sm font-medium">{t('subscribed')}</p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('emailPlaceholder')}
                required
                className="flex-1 px-4 py-2.5 rounded-md border border-gray-300 text-gray-900 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-green-700 text-white text-sm font-semibold rounded-md hover:bg-green-800 transition-colors cursor-pointer shrink-0"
              >
                {t('subscribe')}
              </button>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
