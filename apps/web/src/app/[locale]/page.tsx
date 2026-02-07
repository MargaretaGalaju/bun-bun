'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function HomePage() {
  const t = useTranslations('home');

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('subtitle')}</p>
      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
        <Link
          href="/products"
          style={{
            padding: '0.75rem 1.5rem',
            background: '#0070f3',
            color: 'white',
            borderRadius: '8px',
            textDecoration: 'none',
          }}
        >
          {t('browse')}
        </Link>
      </div>
    </div>
  );
}
