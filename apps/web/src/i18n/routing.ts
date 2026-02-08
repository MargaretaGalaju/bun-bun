import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['ru', 'ro'],
  defaultLocale: 'ru',
  localePrefix: 'never',
});

export type Locale = (typeof routing.locales)[number];
