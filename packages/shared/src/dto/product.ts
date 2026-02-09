import { ProductStatus } from '../enums';

export interface ProductImageDto {
  id: string;
  url: string;
  position: number;
}

export interface ProductDto {
  id: string;
  title: string;
  description: string;
  price: number;
  status: ProductStatus;
  city?: string;
  sellerId: string;
  categoryId: string;
  images: ProductImageDto[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductDto {
  title: string;
  description: string;
  price: number;
  categoryId: string;
  city?: string;
}

export interface UpdateProductDto {
  title?: string;
  description?: string;
  price?: number;
  categoryId?: string;
  city?: string;
}

export interface UpdateProductStatusDto {
  status: 'DRAFT' | 'ACTIVE' | 'HIDDEN';
}

export interface AddProductImageDto {
  key: string;
  position?: number;
}

export interface PresignResponse {
  uploadUrl: string;
  key: string;
  publicUrl: string;
}
