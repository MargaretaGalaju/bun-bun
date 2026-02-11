import { ProductStatus, Role } from '../enums';

// ── Categories ──────────────────────────────────────────────

export interface AdminCategoryDto {
  id: string;
  name: string;
  nameRu: string | null;
  nameRo: string | null;
  slug: string;
  imageUrl: string | null;
  parentId: string | null;
}

// ── Users ───────────────────────────────────────────────────

export interface AdminUserDto {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  role: Role;
  isBlocked: boolean;
  createdAt: string;
}

// ── Products ────────────────────────────────────────────────

export interface AdminProductImageDto {
  id: string;
  url: string;
  position: number;
}

export interface AdminProductDto {
  id: string;
  titleRo: string;
  titleRu: string;
  descriptionRo: string;
  descriptionRu: string;
  price: number;
  city: string | null;
  status: ProductStatus;
  sellerId: string;
  sellerName: string;
  sellerEmail: string;
  categoryId: string;
  images: AdminProductImageDto[];
  createdAt: string;
  updatedAt: string;
}

// ── Pagination ──────────────────────────────────────────────

export interface PagedResponse<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
}
