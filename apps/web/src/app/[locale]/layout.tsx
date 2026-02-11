import type { ReactNode } from 'react';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Providers } from './providers';
import { NavBar } from './navbar';

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const metadata = messages.metadata as Record<string, string>;
  return {
    title: metadata?.title || 'Marketplace',
    description: metadata?.description || 'Marketplace MVP',
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} style={{ margin: 0, padding: 0 }}>
      <body style={{ margin: 0, padding: 0 }}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <header>
              <NavBar />
            </header>
            <main style={{ padding: '2rem' }}>{children}</main>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
