import { ProductStatus } from '../enums';

export interface ProductImageDto {
  id: string;
  url: string;
  position: number;
}

export interface ProductDto {
  id: string;
  titleRo: string;
  titleRu: string;
  descriptionRo: string;
  descriptionRu: string;
  price: number;
  status: ProductStatus;
  city?: string;
  sellerId: string;
  sellerName?: string;
  categoryId: string;
  images: ProductImageDto[];
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedProductsDto {
  items: ProductDto[];
  total: number;
  page: number;
  limit: number;
}

export interface CreateProductDto {
  titleRo: string;
  titleRu: string;
  descriptionRo: string;
  descriptionRu: string;
  price: number;
  categoryId: string;
  city?: string;
}

export interface UpdateProductDto {
  titleRo?: string;
  titleRu?: string;
  descriptionRo?: string;
  descriptionRu?: string;
  price?: number;
  categoryId?: string;
  city?: string;
}

export interface CityDto {
  id: string;
  nameRo: string;
  nameRu: string;
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
