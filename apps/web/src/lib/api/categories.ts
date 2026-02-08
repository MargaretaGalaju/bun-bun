import type { CategoryDto } from '@bun-bun/shared';
import { apiFetch } from './client';

export function getCategories(): Promise<CategoryDto[]> {
  return apiFetch<CategoryDto[]>('/categories');
}
