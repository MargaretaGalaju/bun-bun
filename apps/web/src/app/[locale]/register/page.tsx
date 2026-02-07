'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { authRegisterSchema } from '@bun-bun/shared';
import { useAuth } from '@/lib/auth/AuthContext';
import { useRouter } from '@/i18n/navigation';
import { Link } from '@/i18n/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const t = useTranslations('register');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'BUYER' | 'SELLER'>('BUYER');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const parsed = authRegisterSchema.safeParse({ email, password, name, role });
    if (!parsed.success) {
      setError(parsed.error.errors[0]?.message || t('validationError'));
      return;
    }

    setSubmitting(true);
    try {
      await register(parsed.data);
      router.push('/');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : t('failed');
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto' }}>
      <h1>{t('title')}</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label htmlFor="name" style={{ display: 'block', marginBottom: 4 }}>{t('name')}</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }}
          />
        </div>
        <div>
          <label htmlFor="email" style={{ display: 'block', marginBottom: 4 }}>{t('email')}</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }}
          />
        </div>
        <div>
          <label htmlFor="password" style={{ display: 'block', marginBottom: 4 }}>{t('password')}</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }}
          />
        </div>
        <div>
          <label htmlFor="role" style={{ display: 'block', marginBottom: 4 }}>{t('role')}</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value as 'BUYER' | 'SELLER')}
            style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }}
          >
            <option value="BUYER">{t('buyer')}</option>
            <option value="SELLER">{t('seller')}</option>
          </select>
        </div>

        {error && (
          <div style={{ color: 'red', fontSize: '0.9rem' }}>{error}</div>
        )}

        <button
          type="submit"
          disabled={submitting}
          style={{
            padding: '0.6rem 1.2rem',
            cursor: submitting ? 'not-allowed' : 'pointer',
            opacity: submitting ? 0.6 : 1,
          }}
        >
          {submitting ? t('submitting') : t('submit')}
        </button>
      </form>

      <p style={{ marginTop: '1rem' }}>
        {t('hasAccount')} <Link href="/login">{t('loginLink')}</Link>
      </p>
    </div>
  );
}
