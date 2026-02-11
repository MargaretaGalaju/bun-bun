import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import type {
  ProductDto,
  ProductImageDto,
  PaginatedProductsDto,
} from '@bun-bun/shared';
import { ProductStatus } from '@bun-bun/shared';

export interface ProductFilters {
  q?: string;
  city?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: 'price_asc' | 'price_desc' | 'newest' | 'oldest';
  page?: number;
  limit?: number;
}

const PRODUCT_INCLUDE = {
  images: { orderBy: { position: 'asc' as const } },
  seller: { select: { name: true } },
} satisfies Prisma.ProductInclude;

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(filters: ProductFilters = {}): Promise<PaginatedProductsDto> {
    const where: Prisma.ProductWhereInput = { status: 'ACTIVE' };

    if (filters.q) {
      where.OR = [
        { titleRo: { contains: filters.q, mode: 'insensitive' } },
        { titleRu: { contains: filters.q, mode: 'insensitive' } },
        { descriptionRo: { contains: filters.q, mode: 'insensitive' } },
        { descriptionRu: { contains: filters.q, mode: 'insensitive' } },
      ];
    }

    if (filters.city) {
      where.city = filters.city;
    }

    if (filters.categoryId) {
      where.categoryId = filters.categoryId;
    }

    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      where.price = {};
      if (filters.minPrice !== undefined) where.price.gte = filters.minPrice;
      if (filters.maxPrice !== undefined) where.price.lte = filters.maxPrice;
    }

    let orderBy: Prisma.ProductOrderByWithRelationInput;
    switch (filters.sort) {
      case 'price_asc':
        orderBy = { price: 'asc' };
        break;
      case 'price_desc':
        orderBy = { price: 'desc' };
        break;
      case 'oldest':
        orderBy = { createdAt: 'asc' };
        break;
      case 'newest':
      default:
        orderBy = { createdAt: 'desc' };
        break;
    }

    const page = filters.page ?? 1;
    const limit = filters.limit ?? 20;
    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        orderBy,
        include: PRODUCT_INCLUDE,
        skip,
        take: limit,
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      items: products.map((p) => this.toDto(p)),
      total,
      page,
      limit,
    };
  }

  async findById(id: string): Promise<ProductDto | null> {
    const p = await this.prisma.product.findFirst({
      where: { id, status: 'ACTIVE' },
      include: PRODUCT_INCLUDE,
    });
    if (!p) return null;

    return this.toDto(p);
  }

  private toDto(p: any): ProductDto {
    return {
      id: p.id,
      titleRo: p.titleRo,
      titleRu: p.titleRu,
      descriptionRo: p.descriptionRo,
      descriptionRu: p.descriptionRu,
      price: p.price,
      status: p.status as ProductStatus,
      city: p.city || undefined,
      sellerId: p.sellerId,
      sellerName: p.seller?.name,
      categoryId: p.categoryId,
      images: (p.images || []).map((img: any): ProductImageDto => ({
        id: img.id,
        url: img.url,
        position: img.position,
      })),
      createdAt: p.createdAt.toISOString(),
      updatedAt: p.updatedAt.toISOString(),
    };
  }
}
