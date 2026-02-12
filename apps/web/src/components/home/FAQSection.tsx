'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { FAQ_ITEMS } from '@/data/faq';

export function FAQSection() {
  const t = useTranslations('home');
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null);

  return (
    <section className="w-full py-12 bg-gray-50">
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-xl font-bold text-gray-900 mb-6">{t('faqTitle')}</h2>
        <div className="space-y-2">
          {FAQ_ITEMS.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenId(openId === item.id ? null : item.id)}
                className="w-full flex items-center justify-between px-4 py-3 text-left font-medium text-gray-900 hover:bg-gray-50 transition-colors"
              >
                {t(item.questionKey)}
                <svg
                  className={`w-5 h-5 shrink-0 transition-transform ${openId === item.id ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openId === item.id && (
                <div className="px-4 pb-3 pt-0 text-sm text-gray-600 border-t border-gray-100">
                  {t(item.answerKey)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
