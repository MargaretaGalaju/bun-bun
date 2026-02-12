import type { CityDto } from '@bun-bun/shared';
import { apiFetch } from './client';

export function getCities(): Promise<CityDto[]> {
  return apiFetch<CityDto[]>('/cities');
}
