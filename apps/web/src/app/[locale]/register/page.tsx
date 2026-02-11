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
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-6">{t('title')}</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            {t('name')}
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            {t('email')}
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            {t('password')}
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            className="w-full"
          />
        </div>
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
            {t('role')}
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value as 'BUYER' | 'SELLER')}
            className="w-full"
          >
            <option value="BUYER">{t('buyer')}</option>
            <option value="SELLER">{t('seller')}</option>
          </select>
        </div>

        {error && (
          <div className="text-red-600 text-sm bg-red-50 rounded-md px-3 py-2">{error}</div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-2.5 px-4 bg-green-700 text-white font-semibold rounded-md hover:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? t('submitting') : t('submit')}
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-600">
        {t('hasAccount')}{' '}
        <Link href="/login" className="text-green-700 hover:underline">
          {t('loginLink')}
        </Link>
      </p>
    </div>
  );
}
