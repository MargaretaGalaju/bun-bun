import type { ProductDto } from '@bun-bun/shared';
import { apiFetch } from './client';

export function getProducts(): Promise<ProductDto[]> {
  return apiFetch<ProductDto[]>('/products');
}

export function getProductById(id: string): Promise<ProductDto> {
  return apiFetch<ProductDto>(`/products/${id}`);
}
