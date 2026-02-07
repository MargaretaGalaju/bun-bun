import { ProductStatus } from '../enums';

export interface ProductDto {
  id: string;
  title: string;
  description: string;
  price: number;
  status: ProductStatus;
  sellerId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductDto {
  title: string;
  description: string;
  price: number;
  categoryId: string;
}
