import { apiFetch } from './client';

export interface CategoryDto {
  id: string;
  name: string;
  slug: string;
}

export function getCategories(): Promise<CategoryDto[]> {
  return apiFetch<CategoryDto[]>('/categories');
}
