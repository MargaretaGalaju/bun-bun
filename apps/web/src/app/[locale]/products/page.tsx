'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { Link, useRouter } from '@/i18n/navigation';
import type { ProductDto, CityDto, CategoryDto } from '@bun-bun/shared';
import { listPublicProducts, type PublicProductParams } from '@/lib/api/products';
import { getCities } from '@/lib/api/cities';
import { getCategories } from '@/lib/api/categories';
import { useCart } from '@/features/cart/CartContext';
import { getProductTitle, getCityName } from '@/lib/localizedProduct';
import CitySelect from '@/components/CitySelect';

function getCategoryName(cat: CategoryDto, locale: string) {
  if (locale === 'ru' && cat.nameRu) return cat.nameRu;
  if (locale === 'ro' && cat.nameRo) return cat.nameRo;
  return cat.name;
}

function buildProductsSearchParams(q: string, categoryId: string): string {
  const params = new URLSearchParams();
  if (q.trim()) params.set('q', q.trim());
  if (categoryId) params.set('categoryId', categoryId);
  const s = params.toString();
  return s ? `?${s}` : '';
}

export default function ProductsPage() {
  const t = useTranslations('products');
  const tc = useTranslations('common');
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addItem } = useCart();
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [cities, setCities] = useState<CityDto[]>([]);
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addedId, setAddedId] = useState<string | null>(null);

  // Filters (q and categoryId sync with URL)
  const [q, setQ] = useState(() => searchParams.get('q') ?? '');
  const [categoryId, setCategoryId] = useState(() => searchParams.get('categoryId') ?? '');
  const [city, setCity] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sort, setSort] = useState<PublicProductParams['sort']>('newest');

  // Sync state from URL when searchParams change (e.g. navbar navigation)
  useEffect(() => {
    setQ(searchParams.get('q') ?? '');
    setCategoryId(searchParams.get('categoryId') ?? '');
  }, [searchParams]);

  useEffect(() => {
    getCities()
      .then(setCities)
      .catch(() => {});
  }, []);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => {});
  }, []);

  const updateProductsUrl = useCallback(
    (newQ: string, newCategoryId: string) => {
      const query = buildProductsSearchParams(newQ, newCategoryId);
      router.replace(`/products${query}`);
    },
    [router],
  );

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params: PublicProductParams = { sort };
      if (q.trim()) params.q = q.trim();
      if (categoryId) params.categoryId = categoryId;
      if (city) params.city = city;
      if (minPrice) params.minPrice = parseFloat(minPrice);
      if (maxPrice) params.maxPrice = parseFloat(maxPrice);
      const data = await listPublicProducts(params);
      setProducts(data.items);
    } catch {
      setError(t('loadError'));
    } finally {
      setLoading(false);
    }
  }, [q, categoryId, city, minPrice, maxPrice, sort, t]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  function handleAddToCart(e: React.MouseEvent, product: ProductDto) {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId((prev) => (prev === product.id ? null : prev)), 2000);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
      <h1 className="text-2xl font-bold mb-4">{t('title')}</h1>

      {/* Filter bar */}
      <div className="flex flex-wrap gap-3 mb-6 p-4 bg-gray-50 rounded-lg items-end">
        <input
          type="text"
          placeholder={t('search')}
          value={q}
          onChange={(e) => {
            const v = e.target.value;
            setQ(v);
            updateProductsUrl(v, categoryId);
          }}
          className="flex-1 min-w-[200px]"
        />
        <select
          value={categoryId}
          onChange={(e) => {
            const v = e.target.value;
            setCategoryId(v);
            updateProductsUrl(q, v);
          }}
          className="w-48"
        >
          <option value="">{t('allCategories')}</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {getCategoryName(cat, locale)}
            </option>
          ))}
        </select>
        <div className="w-48">
          <CitySelect value={city} onChange={setCity} placeholder={t('city')} />
        </div>
        <input
          type="number"
          placeholder={t('minPrice')}
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="w-28"
          min={0}
        />
        <input
          type="number"
          placeholder={t('maxPrice')}
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="w-28"
          min={0}
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as PublicProductParams['sort'])}
          className="w-36"
        >
          <option value="newest">{t('sortNewest')}</option>
          <option value="price_asc">{t('sortPriceAsc')}</option>
          <option value="price_desc">{t('sortPriceDesc')}</option>
        </select>
      </div>

      {loading && <p className="text-gray-500">{t('empty')}</p>}
      {error && <p className="text-red-600 p-4 bg-red-50 rounded-lg">{error}</p>}

      {!loading && !error && products.length === 0 && <p className="text-gray-500">{t('empty')}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {products.map((product) => {
          const title = getProductTitle(product, locale);
          const cityDisplay = product.city ? getCityName(product.city, cities, locale) : null;

          return (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="no-underline text-inherit group"
            >
              <div className="border border-gray-200 rounded-lg overflow-hidden transition-shadow hover:shadow-lg">
                {product.images && product.images.length > 0 ? (
                  <div
                    className="h-48 bg-gray-100 bg-cover bg-center"
                    style={{ backgroundImage: `url(${product.images[0].url})` }}
                  />
                ) : (
                  <div className="h-48 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                    {t('noImage')}
                  </div>
                )}
                <div className="p-4">
                  <h2 className="text-base font-semibold mb-1">{title}</h2>
                  {cityDisplay && <p className="text-gray-500 text-xs mb-1">{cityDisplay}</p>}
                  <p className="font-bold text-green-800 mb-2">
                    {t('price', { price: product.price.toFixed(2) })}
                  </p>
                  <div className="flex items-center gap-2">
                    {addedId === product.id ? (
                      <>
                        <span className="text-green-700 font-semibold text-sm">{tc('added')}</span>
                        <Link
                          href="/cart"
                          onClick={(e) => e.stopPropagation()}
                          className="text-sm text-green-700 underline"
                        >
                          {tc('goToCart')}
                        </Link>
                      </>
                    ) : (
                      <button
                        onClick={(e) => handleAddToCart(e, product)}
                        className="px-3 py-1.5 bg-green-700 text-white text-sm rounded hover:bg-green-800 transition-colors"
                      >
                        {tc('addToCart')}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
