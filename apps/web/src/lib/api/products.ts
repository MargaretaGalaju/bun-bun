import type {
  ProductDto,
  CreateProductDto,
  UpdateProductDto,
  ProductImageDto,
} from '@bun-bun/shared';
import { apiFetch } from './client';

// ── Public endpoints ────────────────────────────────────────

export interface PublicProductParams {
  q?: string;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: 'price_asc' | 'price_desc' | 'newest' | 'oldest';
}

export function listPublicProducts(
  params: PublicProductParams = {},
): Promise<ProductDto[]> {
  const qs = new URLSearchParams();
  if (params.q) qs.set('q', params.q);
  if (params.city) qs.set('city', params.city);
  if (params.minPrice !== undefined) qs.set('minPrice', String(params.minPrice));
  if (params.maxPrice !== undefined) qs.set('maxPrice', String(params.maxPrice));
  if (params.sort) qs.set('sort', params.sort);
  const query = qs.toString();
  return apiFetch<ProductDto[]>(`/products${query ? `?${query}` : ''}`);
}

export function getPublicProduct(id: string): Promise<ProductDto> {
  return apiFetch<ProductDto>(`/products/${id}`);
}

// ── Seller endpoints (auth required) ────────────────────────

export function listMySellerProducts(): Promise<ProductDto[]> {
  return apiFetch<ProductDto[]>('/seller/products');
}

export function createSellerProduct(
  payload: CreateProductDto,
): Promise<ProductDto> {
  return apiFetch<ProductDto>('/seller/products', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function updateSellerProduct(
  id: string,
  payload: UpdateProductDto,
): Promise<ProductDto> {
  return apiFetch<ProductDto>(`/seller/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export function setSellerProductStatus(
  id: string,
  status: string,
): Promise<ProductDto> {
  return apiFetch<ProductDto>(`/seller/products/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}

export function addSellerProductImage(
  id: string,
  key: string,
): Promise<ProductImageDto> {
  return apiFetch<ProductImageDto>(`/seller/products/${id}/images`, {
    method: 'POST',
    body: JSON.stringify({ key }),
  });
}

// ── Upload helpers ──────────────────────────────────────────

export function presignUpload(
  productId: string,
  contentType: string,
  fileExt: string,
): Promise<{ uploadUrl: string; key: string; publicUrl: string }> {
  return apiFetch<{ uploadUrl: string; key: string; publicUrl: string }>(
    '/uploads/presign',
    {
      method: 'POST',
      body: JSON.stringify({ productId, contentType, fileExt }),
    },
  );
}

export async function uploadFileToR2(uploadUrl: string, file: File): Promise<void> {
  const res = await fetch(uploadUrl, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type,
    },
  });
  if (!res.ok) {
    throw new Error(`Upload failed: ${res.status}`);
  }
}
