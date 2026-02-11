import type { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Providers } from './providers';
import { NavBar } from './navbar';
import '../globals.css';

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale && routing.locales.includes(rawLocale as any)
    ? rawLocale
    : routing.defaultLocale;
  const messages = await getMessages({ locale });
  const metadata = messages.metadata as Record<string, string>;
  return {
    title: metadata?.title || 'BunBun',
    description: metadata?.description || 'BunBun MVP',
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale && routing.locales.includes(rawLocale as any)
    ? rawLocale
    : routing.defaultLocale;
  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body className="m-0 p-0 bg-white text-gray-900 font-sans">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <header>
              <NavBar />
            </header>
            <main className="p-8">{children}</main>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
