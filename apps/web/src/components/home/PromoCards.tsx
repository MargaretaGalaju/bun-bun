'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

const PROMO_IMAGES = [
  'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600',
  'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=600',
  'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600',
];

export function PromoCards() {
  const t = useTranslations('home');

  const cards = [
    { key: 'promo1', ctaKey: 'shopNow', href: '/products' },
    { key: 'promo2', ctaKey: 'discoverMore', href: '/products' },
    { key: 'promo3', ctaKey: 'shopNow', href: '/products' },
  ] as const;

  return (
    <section className="w-full py-10 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <Link
              key={card.key}
              href={card.href}
              className="group relative block h-48 md:h-56 rounded-xl overflow-hidden no-underline"
            >
              <img
                src={PROMO_IMAGES[i]}
                alt=""
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex flex-col justify-end p-5 text-white">
                <h3 className="text-lg font-bold mb-2">{t(card.key)}</h3>
                <span className="inline-block px-4 py-2 bg-white text-green-800 text-sm font-semibold rounded-lg w-fit hover:bg-green-50 transition-colors">
                  {t(card.ctaKey)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
