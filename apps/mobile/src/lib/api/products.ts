import type { PaginatedProductsDto, ProductDto } from '@bun-bun/shared';
import { apiFetch } from './client';

export interface PublicProductParams {
  q?: string;
  city?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: 'price_asc' | 'price_desc' | 'newest' | 'oldest';
  page?: number;
  limit?: number;
}

export function listPublicProducts(
  params: PublicProductParams = {},
): Promise<PaginatedProductsDto> {
  const qs = new URLSearchParams();
  if (params.q) qs.set('q', params.q);
  if (params.city) qs.set('city', params.city);
  if (params.categoryId) qs.set('categoryId', params.categoryId);
  if (params.minPrice !== undefined) qs.set('minPrice', String(params.minPrice));
  if (params.maxPrice !== undefined) qs.set('maxPrice', String(params.maxPrice));
  if (params.sort) qs.set('sort', params.sort);
  if (params.page !== undefined) qs.set('page', String(params.page));
  if (params.limit !== undefined) qs.set('limit', String(params.limit));
  const query = qs.toString();
  return apiFetch<PaginatedProductsDto>(`/products${query ? `?${query}` : ''}`);
}

export function getProducts(): Promise<ProductDto[]> {
  return apiFetch<PaginatedProductsDto>('/products').then((res) => res.items);
}

export function getProductById(id: string): Promise<ProductDto> {
  return apiFetch<ProductDto>(`/products/${id}`);
}
