'use client';

import { useTranslations } from 'next-intl';
import { useAuth } from '@/lib/auth/AuthContext';
import { Link, useRouter } from '@/i18n/navigation';
import { useEffect } from 'react';

export default function AdminDashboard() {
  const t = useTranslations('admin');
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user?.role !== 'ADMIN') {
      router.replace('/');
    }
  }, [isLoading, user, router]);

  if (isLoading) return <p>...</p>;
  if (user?.role !== 'ADMIN') return <p>{t('accessDenied')}</p>;

  const sections = [
    { href: '/admin/categories' as const, label: t('nav.categories'), desc: t('nav.categoriesDesc') },
    { href: '/admin/users' as const, label: t('nav.users'), desc: t('nav.usersDesc') },
    { href: '/admin/products' as const, label: t('nav.products'), desc: t('nav.productsDesc') },
  ];

  return (
    <div>
      <h1 style={{ marginBottom: '1.5rem' }}>{t('title')}</h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            style={{
              display: 'block',
              padding: '1.5rem',
              border: '1px solid #ddd',
              borderRadius: '8px',
              textDecoration: 'none',
              color: 'inherit',
              transition: 'box-shadow 0.2s',
            }}
          >
            <h2 style={{ margin: 0, marginBottom: '0.5rem' }}>{s.label}</h2>
            <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>{s.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
