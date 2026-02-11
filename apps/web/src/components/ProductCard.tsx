'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { ProductDto } from '@bun-bun/shared';
import { useCart } from '@/features/cart/CartContext';
import { useState } from 'react';

interface ProductCardProps {
  product: ProductDto;
}

function isNew(createdAt: string): boolean {
  const created = new Date(createdAt);
  const now = new Date();
  const diffDays = (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays <= 7;
}

export function ProductCard({ product }: ProductCardProps) {
  const t = useTranslations('home');
  const tc = useTranslations('common');
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  const showNew = isNew(product.createdAt);

  return (
    <Link
      href={`/products/${product.id}`}
      className="group block bg-white border border-gray-200 rounded-lg overflow-hidden transition-shadow hover:shadow-lg no-underline text-inherit"
    >
      {/* Image */}
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0].url}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            {t('noImage')}
          </div>
        )}
        {showNew && (
          <span className="absolute top-2 left-2 bg-green-700 text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded">
            {t('newBadge')}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-3">
        {/* Seller name */}
        {product.sellerName && (
          <p className="text-xs text-green-700 font-medium mb-0.5 truncate">
            {product.sellerName}
          </p>
        )}

        {/* Title */}
        <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2 leading-tight">
          {product.title}
        </h3>

        {/* Price */}
        <p className="text-sm font-bold text-gray-900 mb-2">
          {t('price', { price: product.price.toFixed(2) })}
        </p>

        {/* Add to cart */}
        <div className="flex items-center gap-2">
          {added ? (
            <>
              <span className="text-green-700 font-semibold text-xs">
                {tc('added')}
              </span>
              <Link
                href="/cart"
                onClick={(e) => e.stopPropagation()}
                className="text-xs text-green-700 underline"
              >
                {tc('goToCart')}
              </Link>
            </>
          ) : (
            <button
              onClick={handleAddToCart}
              className="w-full py-2 px-3 bg-green-700 text-white text-xs font-semibold rounded-md hover:bg-green-800 transition-colors cursor-pointer"
            >
              {tc('addToCart')}
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}
