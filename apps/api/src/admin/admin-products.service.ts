import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

export interface AdminProductsListOptions {
  q?: string;
  status?: string;
  sellerId?: string;
  page?: number;
  pageSize?: number;
}

@Injectable()
export class AdminProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(opts: AdminProductsListOptions = {}) {
    const page = Math.max(1, opts.page ?? 1);
    const pageSize = Math.min(100, Math.max(1, opts.pageSize ?? 20));

    const where: Prisma.ProductWhereInput = {};

    if (opts.status) {
      where.status = opts.status as any;
    }

    if (opts.sellerId) {
      where.sellerId = opts.sellerId;
    }

    if (opts.q) {
      where.OR = [
        { titleRo: { contains: opts.q, mode: 'insensitive' } },
        { titleRu: { contains: opts.q, mode: 'insensitive' } },
        { descriptionRo: { contains: opts.q, mode: 'insensitive' } },
        { descriptionRu: { contains: opts.q, mode: 'insensitive' } },
      ];
    }

    const [items, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
        include: {
          seller: { select: { name: true, email: true } },
          images: { orderBy: { position: 'asc' }, take: 1 },
        },
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      items: items.map((p) => ({
        id: p.id,
        titleRo: p.titleRo,
        titleRu: p.titleRu,
        descriptionRo: p.descriptionRo,
        descriptionRu: p.descriptionRu,
        price: p.price,
        city: p.city,
        status: p.status,
        sellerId: p.sellerId,
        sellerName: p.seller.name,
        sellerEmail: p.seller.email,
        categoryId: p.categoryId,
        images: p.images.map((img) => ({
          id: img.id,
          url: img.url,
          position: img.position,
        })),
        createdAt: p.createdAt.toISOString(),
        updatedAt: p.updatedAt.toISOString(),
      })),
      page,
      pageSize,
      total,
    };
  }

  async findById(id: string) {
    const p = await this.prisma.product.findUnique({
      where: { id },
      include: {
        seller: { select: { name: true, email: true } },
        images: { orderBy: { position: 'asc' } },
      },
    });

    if (!p) {
      throw new NotFoundException('Product not found');
    }

    return {
      id: p.id,
      titleRo: p.titleRo,
      titleRu: p.titleRu,
      descriptionRo: p.descriptionRo,
      descriptionRu: p.descriptionRu,
      price: p.price,
      city: p.city,
      status: p.status,
      sellerId: p.sellerId,
      sellerName: p.seller.name,
      sellerEmail: p.seller.email,
      categoryId: p.categoryId,
      images: p.images.map((img) => ({
        id: img.id,
        url: img.url,
        position: img.position,
      })),
      createdAt: p.createdAt.toISOString(),
      updatedAt: p.updatedAt.toISOString(),
    };
  }

  async updateStatus(id: string, status: string) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const updated = await this.prisma.product.update({
      where: { id },
      data: { status: status as any },
      include: {
        seller: { select: { name: true, email: true } },
        images: { orderBy: { position: 'asc' } },
      },
    });

    return {
      id: updated.id,
      titleRo: updated.titleRo,
      titleRu: updated.titleRu,
      descriptionRo: updated.descriptionRo,
      descriptionRu: updated.descriptionRu,
      price: updated.price,
      city: updated.city,
      status: updated.status,
      sellerId: updated.sellerId,
      sellerName: updated.seller.name,
      sellerEmail: updated.seller.email,
      categoryId: updated.categoryId,
      images: updated.images.map((img) => ({
        id: img.id,
        url: img.url,
        position: img.position,
      })),
      createdAt: updated.createdAt.toISOString(),
      updatedAt: updated.updatedAt.toISOString(),
    };
  }
}
