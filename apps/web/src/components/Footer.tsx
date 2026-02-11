'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

export function Footer() {
  const t = useTranslations('footer');
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
    <footer className="bg-gray-900 text-white mt-16">
      {/* Newsletter section */}
      <div className="border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-10 text-center">
          <h2 className="text-xl font-semibold mb-2">{t('newsletter')}</h2>
          <p className="text-gray-400 text-sm mb-5 max-w-md mx-auto">
            {t('newsletterDesc')}
          </p>
          {subscribed ? (
            <p className="text-green-400 font-medium text-sm">{t('subscribed')}</p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="flex-1 px-4 py-2.5 rounded-md bg-gray-800 border border-gray-600 text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-green-700 text-white text-sm font-semibold rounded-md hover:bg-green-800 transition-colors cursor-pointer"
              >
                {t('subscribe')}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Info section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-3">
              {t('contact')}
            </h3>
            <p className="text-gray-400 text-sm mb-1">{t('hours')}</p>
            <p className="text-gray-400 text-sm mb-1">{t('phone')}</p>
            <p className="text-gray-400 text-sm">{t('email')}</p>
          </div>

          {/* Brand */}
          <div className="text-center">
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-3">
              BunBun
            </h3>
            <p className="text-gray-400 text-sm">{t('tagline')}</p>
          </div>

          {/* Payment */}
          <div className="text-right">
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-3">
              {t('payment')}
            </h3>
            <div className="flex gap-2 justify-end">
              <span className="bg-gray-800 rounded px-2 py-1 text-xs text-gray-300">Visa</span>
              <span className="bg-gray-800 rounded px-2 py-1 text-xs text-gray-300">Mastercard</span>
              <span className="bg-gray-800 rounded px-2 py-1 text-xs text-gray-300">Apple Pay</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 py-4 text-center text-gray-500 text-xs">
        © {new Date().getFullYear()} BunBun. {t('rights')}
      </div>
    </footer>
  );
}
