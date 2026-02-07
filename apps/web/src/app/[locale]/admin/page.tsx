'use client';

import { useTranslations } from 'next-intl';

export default function AdminPage() {
  const t = useTranslations('admin');

  return (
    <div>
      <h1>{t('title')}</h1>
      <p style={{ color: '#666', marginTop: '1rem' }}>
        {t('description')}
      </p>
      <div
        style={{
          marginTop: '2rem',
          padding: '2rem',
          border: '2px dashed #ccc',
          borderRadius: '8px',
          textAlign: 'center',
          color: '#999',
        }}
      >
        <p>{t('comingSoon')}</p>
      </div>
    </div>
  );
}
