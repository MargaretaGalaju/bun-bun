import type {
  AdminCategoryDto,
  AdminUserDto,
  AdminProductDto,
  PagedResponse,
} from '@bun-bun/shared';
import { apiFetch } from './client';

// ── Categories ──────────────────────────────────────────────

export function getAdminCategories(): Promise<AdminCategoryDto[]> {
  return apiFetch<AdminCategoryDto[]>('/admin/categories');
}

export function createAdminCategory(data: {
  name: string;
  nameRu?: string;
  nameRo?: string;
  imageUrl?: string;
  parentId?: string;
  rating?: number;
}): Promise<AdminCategoryDto> {
  return apiFetch<AdminCategoryDto>('/admin/categories', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function updateAdminCategory(
  id: string,
  data: {
    name?: string;
    nameRu?: string;
    nameRo?: string;
    imageUrl?: string | null;
    parentId?: string | null;
  },
): Promise<AdminCategoryDto> {
  return apiFetch<AdminCategoryDto>(`/admin/categories/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export function deleteAdminCategory(id: string): Promise<{ deleted: boolean }> {
  return apiFetch<{ deleted: boolean }>(`/admin/categories/${id}`, {
    method: 'DELETE',
  });
}

export function presignCategoryUpload(
  categoryId: string,
  contentType: string,
  fileExt: string,
): Promise<{ uploadUrl: string; key: string; publicUrl: string }> {
  return apiFetch<{ uploadUrl: string; key: string; publicUrl: string }>(
    `/admin/categories/${categoryId}/presign`,
    {
      method: 'POST',
      body: JSON.stringify({ contentType, fileExt }),
    },
  );
}

// ── Users ───────────────────────────────────────────────────

export function getAdminUsers(params?: {
  q?: string;
  role?: string;
  page?: number;
  pageSize?: number;
}): Promise<PagedResponse<AdminUserDto>> {
  const qs = new URLSearchParams();
  if (params?.q) qs.set('q', params.q);
  if (params?.role) qs.set('role', params.role);
  if (params?.page) qs.set('page', String(params.page));
  if (params?.pageSize) qs.set('pageSize', String(params.pageSize));
  const query = qs.toString();
  return apiFetch<PagedResponse<AdminUserDto>>(`/admin/users${query ? `?${query}` : ''}`);
}

export function blockAdminUser(id: string, isBlocked: boolean): Promise<AdminUserDto> {
  return apiFetch<AdminUserDto>(`/admin/users/${id}/block`, {
    method: 'PATCH',
    body: JSON.stringify({ isBlocked }),
  });
}

export function changeAdminUserRole(id: string, role: string): Promise<AdminUserDto> {
  return apiFetch<AdminUserDto>(`/admin/users/${id}/role`, {
    method: 'PATCH',
    body: JSON.stringify({ role }),
  });
}

// ── Products ────────────────────────────────────────────────

export function getAdminProducts(params?: {
  q?: string;
  status?: string;
  sellerId?: string;
  page?: number;
  pageSize?: number;
}): Promise<PagedResponse<AdminProductDto>> {
  const qs = new URLSearchParams();
  if (params?.q) qs.set('q', params.q);
  if (params?.status) qs.set('status', params.status);
  if (params?.sellerId) qs.set('sellerId', params.sellerId);
  if (params?.page) qs.set('page', String(params.page));
  if (params?.pageSize) qs.set('pageSize', String(params.pageSize));
  const query = qs.toString();
  return apiFetch<PagedResponse<AdminProductDto>>(`/admin/products${query ? `?${query}` : ''}`);
}

export function getAdminProduct(id: string): Promise<AdminProductDto> {
  return apiFetch<AdminProductDto>(`/admin/products/${id}`);
}

export function changeAdminProductStatus(id: string, status: string): Promise<AdminProductDto> {
  return apiFetch<AdminProductDto>(`/admin/products/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}
