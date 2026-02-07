import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import type { ProductDto, ProductImageDto } from '@bun-bun/shared';
import { ProductStatus } from '@bun-bun/shared';

export interface ProductFilters {
  q?: string;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: 'price_asc' | 'price_desc' | 'newest' | 'oldest';
}

const IMAGES_INCLUDE = {
  images: { orderBy: { position: 'asc' as const } },
} satisfies Prisma.ProductInclude;

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(filters: ProductFilters = {}): Promise<ProductDto[]> {
    const where: Prisma.ProductWhereInput = { status: 'ACTIVE' };

    if (filters.q) {
      where.OR = [
        { title: { contains: filters.q, mode: 'insensitive' } },
        { description: { contains: filters.q, mode: 'insensitive' } },
      ];
    }

    if (filters.city) {
      where.city = filters.city;
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

    const products = await this.prisma.product.findMany({
      where,
      orderBy,
      include: IMAGES_INCLUDE,
    });

    return products.map((p) => this.toDto(p));
  }

  async findById(id: string): Promise<ProductDto | null> {
    const p = await this.prisma.product.findFirst({
      where: { id, status: 'ACTIVE' },
      include: IMAGES_INCLUDE,
    });
    if (!p) return null;

    return this.toDto(p);
  }

  private toDto(p: any): ProductDto {
    return {
      id: p.id,
      title: p.title,
      description: p.description,
      price: p.price,
      status: p.status as ProductStatus,
      city: p.city || undefined,
      sellerId: p.sellerId,
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
