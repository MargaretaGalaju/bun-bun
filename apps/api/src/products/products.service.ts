import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { ProductDto } from '@bun-bun/shared';
import { ProductStatus } from '@bun-bun/shared';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<ProductDto[]> {
    const products = await this.prisma.product.findMany({
      where: { status: 'ACTIVE' },
      orderBy: { createdAt: 'desc' },
    });

    return products.map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      price: p.price,
      status: p.status as ProductStatus,
      sellerId: p.sellerId,
      categoryId: p.categoryId,
      createdAt: p.createdAt.toISOString(),
      updatedAt: p.updatedAt.toISOString(),
    }));
  }

  async findById(id: string): Promise<ProductDto | null> {
    const p = await this.prisma.product.findUnique({ where: { id } });
    if (!p) return null;

    return {
      id: p.id,
      title: p.title,
      description: p.description,
      price: p.price,
      status: p.status as ProductStatus,
      sellerId: p.sellerId,
      categoryId: p.categoryId,
      createdAt: p.createdAt.toISOString(),
      updatedAt: p.updatedAt.toISOString(),
    };
  }
}
