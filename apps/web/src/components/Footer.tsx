'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Link } from '@/i18n/navigation';

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

  const socialLinks = [
    { label: 'Instagram', href: '#', aria: 'Instagram' },
    { label: 'Facebook', href: '#', aria: 'Facebook' },
    { label: 'TikTok', href: '#', aria: 'TikTok' },
  ];

  return (
    <footer className="bg-gray-900 text-white mt-16">
      {/* Social + newsletter */}
      <div className="border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex justify-center md:justify-start gap-4">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.aria}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </div>
            <div className="flex-1 max-w-md mx-auto md:mx-0 md:max-w-sm">
              <p className="text-sm font-semibold mb-2 text-center md:text-left">
                {t('newsletter')}
              </p>
              {subscribed ? (
                <p className="text-green-400 text-sm">{t('subscribed')}</p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('emailPlaceholder')}
                    required
                    className="flex-1 px-4 py-2.5 rounded-md bg-gray-800 border border-gray-600 text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
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
          </div>
        </div>
      </div>

      {/* Nav + contact */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-3">BunBun</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white text-sm">
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-white text-sm">
                  {t('catalog')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white text-sm">
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-3">{t('about')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white text-sm">
                  {t('aboutUs')}
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-white text-sm">
                  {t('ourFarmers')}
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-span-2">
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-3">{t('contact')}</h3>
            <p className="text-gray-400 text-sm mb-1">{t('hours')}</p>
            <p className="text-gray-400 text-sm mb-1">{t('phone')}</p>
            <p className="text-gray-400 text-sm">{t('email')}</p>
          </div>
        </div>
        <p className="text-gray-500 text-sm mt-8">{t('tagline')}</p>
      </div>

      {/* Payment + copyright */}
      <div className="border-t border-gray-700 px-4 py-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex gap-2">
            <span className="bg-gray-800 rounded px-2 py-1 text-xs text-gray-300">Visa</span>
            <span className="bg-gray-800 rounded px-2 py-1 text-xs text-gray-300">Mastercard</span>
            <span className="bg-gray-800 rounded px-2 py-1 text-xs text-gray-300">Apple Pay</span>
          </div>
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} BunBun. {t('rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}
