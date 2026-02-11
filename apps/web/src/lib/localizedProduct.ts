import type { ProductDto, CityDto } from '@bun-bun/shared';

export function getProductTitle(product: ProductDto, locale: string): string {
  return locale === 'ro' ? product.titleRo : product.titleRu;
}

export function getProductDescription(product: ProductDto, locale: string): string {
  return locale === 'ro' ? product.descriptionRo : product.descriptionRu;
}

export function getCityName(cityId: string, cities: CityDto[], locale: string): string {
  const city = cities.find((c) => c.id === cityId);
  if (!city) return cityId; // fallback to raw value (legacy data)
  return locale === 'ro' ? city.nameRo : city.nameRu;
}
