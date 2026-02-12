'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

export function NewsletterBanner() {
  const t = useTranslations('home');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  }

  return (
    <section className="w-full py-10 bg-green-700">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h2 className="text-xl font-bold text-white mb-2">{t('newsletterBannerTitle')}</h2>
        <p className="text-green-100 text-sm mb-6">{t('newsletterBannerDesc')}</p>
        {subscribed ? (
          <p className="text-white font-medium">{t('newsletterSubscribed')}</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('newsletterEmailPlaceholder')}
              required
              className="flex-1 min-w-0 px-4 py-3 rounded-lg border-0 text-gray-900 placeholder-gray-500"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-green-800 font-semibold rounded-lg hover:bg-green-50 transition-colors shrink-0"
            >
              {t('newsletterSignup')}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
