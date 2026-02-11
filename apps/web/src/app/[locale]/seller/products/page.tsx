'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, useRouter } from '@/i18n/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import type { ProductDto } from '@bun-bun/shared';
import { listMySellerProducts, setSellerProductStatus } from '@/lib/api/products';

const statusClasses: Record<string, string> = {
  ACTIVE: 'bg-green-100 text-green-800',
  DRAFT: 'bg-yellow-100 text-yellow-800',
  HIDDEN: 'bg-gray-200 text-gray-700',
};

function StatusBadge({ status, t }: { status: string; t: (key: string) => string }) {
  const classes = statusClasses[status] || statusClasses.DRAFT;
  const labelKey = `status${status.charAt(0) + status.slice(1).toLowerCase()}`;
  return (
    <span className={`inline-block py-1 px-2.5 rounded-xl text-xs font-semibold ${classes}`}>
      {t(labelKey)}
    </span>
  );
}

export default function SellerProductsPage() {
  const t = useTranslations('seller.products');
  const tc = useTranslations('common');
  const locale = useLocale();
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [products, setProducts] = useState<ProductDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isSeller = user?.role === 'SELLER';

  useEffect(() => {
    if (authLoading) return;
    if (!isSeller) return;

    let cancelled = false;
    async function load() {
      try {
        const data = await listMySellerProducts();
        if (!cancelled) setProducts(data);
      } catch {
        if (!cancelled) setError(tc('errorGeneric'));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [authLoading, isSeller, tc]);

  if (authLoading) return <p>{tc('loading')}</p>;

  if (!isSeller) {
    return (
      <div className="text-center mt-12">
        <p className="text-lg text-gray-500">{t('accessRequired')}</p>
        <Link
          href="/login"
          className="inline-block mt-4 py-2 px-6 bg-gray-800 text-white rounded-md no-underline hover:bg-gray-700 transition-colors"
        >
          {tc('error401')}
        </Link>
      </div>
    );
  }

  async function toggleStatus(product: ProductDto) {
    const newStatus = product.status === 'ACTIVE' ? 'HIDDEN' : 'ACTIVE';
    try {
      const updated = await setSellerProductStatus(product.id, newStatus);
      setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    } catch {
      alert(tc('errorGeneric'));
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1>{t('title')}</h1>
        <Link
          href="/seller/products/new"
          className="py-2 px-5 bg-green-700 text-white rounded-md no-underline font-semibold hover:bg-green-800 transition-colors"
        >
          + {t('create')}
        </Link>
      </div>

      {error && <p className="text-red-600 p-4 bg-red-50 rounded-lg">{error}</p>}

      {loading && <p>{tc('loading')}</p>}

      {!loading && products.length === 0 && !error && (
        <p className="text-gray-500">{t('noProducts')}</p>
      )}

      {products.length > 0 && (
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-200 text-left">
              <th className="p-3">{t('titleField')}</th>
              <th className="p-3">{t('priceField')}</th>
              <th className="p-3">Status</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-gray-100">
                <td className="p-3">{locale === 'ro' ? p.titleRo : p.titleRu}</td>
                <td className="p-3">{p.price.toFixed(2)} $</td>
                <td className="p-3">
                  <StatusBadge status={p.status} t={t} />
                </td>
                <td className="p-3 flex gap-2">
                  <Link
                    href={`/seller/products/${p.id}/edit`}
                    className="py-1.5 px-3 border border-gray-300 rounded no-underline text-sm text-gray-800 hover:bg-gray-50 transition-colors"
                  >
                    {t('edit')}
                  </Link>
                  <button
                    onClick={() => toggleStatus(p)}
                    className={`py-1.5 px-3 border border-gray-300 rounded cursor-pointer text-sm ${p.status === 'ACTIVE' ? 'bg-yellow-100 hover:bg-yellow-200' : 'bg-green-100 hover:bg-green-200'}`}
                  >
                    {p.status === 'ACTIVE' ? t('hide') : t('publish')}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
