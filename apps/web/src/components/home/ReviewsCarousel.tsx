'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { REVIEWS } from '@/data/reviews';

export function ReviewsCarousel() {
  const t = useTranslations('home');
  const [index, setIndex] = useState(0);
  const review = REVIEWS[index];

  return (
    <section className="w-full py-12 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-xl font-bold text-gray-900 mb-8 text-center">{t('reviewsTitle')}</h2>
        <div className="bg-gray-50 rounded-xl p-6 md:p-8 border border-gray-100">
          <blockquote className="text-gray-700 mb-4">
            <p className="text-lg font-medium mb-2">&ldquo;{t(review.quoteKey)}&rdquo;</p>
            <p className="text-sm text-gray-600">{t(review.bodyKey)}</p>
          </blockquote>
          <cite className="not-italic font-semibold text-gray-900">{t(review.authorKey)}</cite>
        </div>
        <div className="flex items-center justify-center gap-2 mt-6">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                i === index ? 'bg-green-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={t('reviewsPage', { current: i + 1, total: REVIEWS.length })}
            />
          ))}
        </div>
        <p className="text-center text-sm text-gray-500 mt-2">
          {index + 1}/{REVIEWS.length}
        </p>
      </div>
    </section>
  );
}
