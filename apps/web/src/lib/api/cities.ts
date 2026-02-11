'use client';

import type { CityDto } from '@bun-bun/shared';
import { apiFetch } from './client';

let _citiesCache: CityDto[] | null = null;

export async function getCities(): Promise<CityDto[]> {
  if (_citiesCache) return _citiesCache;
  const cities = await apiFetch<CityDto[]>('/cities');
  _citiesCache = cities;
  return cities;
}
