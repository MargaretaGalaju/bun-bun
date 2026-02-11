'use client';

import { useEffect, useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import type { ProductDto } from '@bun-bun/shared';
import { listPublicProducts, type PublicProductParams } from '@/lib/api/products';
import { CategoryStrip } from '@/components/CategoryStrip';
import { FilterSidebar } from '@/components/FilterSidebar';
import { ProductCard } from '@/components/ProductCard';
import { Pagination } from '@/components/Pagination';
import { Footer } from '@/components/Footer';

const ITEMS_PER_PAGE = 20;

export default function HomePage() {
  const t = useTranslations('home');

  const [products, setProducts] = useState<ProductDto[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sort, setSort] = useState<string>('newest');
  const [page, setPage] = useState(1);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params: PublicProductParams = {
        sort: sort as PublicProductParams['sort'],
        page,
        limit: ITEMS_PER_PAGE,
      };
      if (categoryId) params.categoryId = categoryId;
      if (minPrice) params.minPrice = parseFloat(minPrice);
      if (maxPrice) params.maxPrice = parseFloat(maxPrice);

      const data = await listPublicProducts(params);
      setProducts(data.items);
      setTotal(data.total);
    } catch {
      setError(t('noProducts'));
    } finally {
      setLoading(false);
    }
  }, [categoryId, minPrice, maxPrice, sort, page, t]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Reset page when filters change
  function handleCategoryChange(id: string | null) {
    setCategoryId(id);
    setPage(1);
  }

  function handleSortChange(val: string) {
    setSort(val);
    setPage(1);
  }

  function handleMinPriceChange(val: string) {
    setMinPrice(val);
    setPage(1);
  }

  function handleMaxPriceChange(val: string) {
    setMaxPrice(val);
    setPage(1);
  }

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  return (
    <div className="-m-8 min-h-screen flex flex-col">
      {/* Category strip */}
      <div className="border-b border-gray-100 bg-white">
        <CategoryStrip
          activeCategoryId={categoryId}
          onSelect={handleCategoryChange}
        />
      </div>

      {/* Collection header */}
      <div className="bg-gradient-to-b from-green-50 to-white px-4 py-8 md:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {t('title')}
          </h1>
          <p className="text-gray-600 text-sm md:text-base max-w-xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 max-w-6xl mx-auto w-full px-4 md:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <FilterSidebar
            minPrice={minPrice}
            maxPrice={maxPrice}
            onMinPriceChange={handleMinPriceChange}
            onMaxPriceChange={handleMaxPriceChange}
            sort={sort}
            onSortChange={handleSortChange}
            totalProducts={total}
          />

          {/* Product grid */}
          <div className="flex-1">
            {loading && (
              <div className="flex items-center justify-center py-16">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-700" />
              </div>
            )}

            {error && (
              <div className="text-center py-16 text-gray-500">
                <p>{error}</p>
              </div>
            )}

            {!loading && !error && products.length === 0 && (
              <div className="text-center py-16 text-gray-500">
                <p className="text-lg">{t('noProducts')}</p>
              </div>
            )}

            {!loading && !error && products.length > 0 && (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
