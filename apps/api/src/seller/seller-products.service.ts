import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { ProductDto, ProductImageDto } from '@bun-bun/shared';
import { ProductStatus } from '@bun-bun/shared';
import type { Prisma } from '@prisma/client';

const IMAGES_INCLUDE = {
  images: { orderBy: { position: 'asc' as const } },
} satisfies Prisma.ProductInclude;

@Injectable()
export class SellerProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    sellerId: string,
    data: { title: string; description: string; price: number; categoryId: string; city?: string },
  ): Promise<ProductDto> {
    const product = await this.prisma.product.create({
      data: {
        title: data.title,
        description: data.description,
        price: data.price,
        city: data.city,
        status: 'DRAFT',
        sellerId,
        categoryId: data.categoryId,
      },
      include: IMAGES_INCLUDE,
    });
    return this.toDto(product);
  }

  async findAllOwn(sellerId: string): Promise<ProductDto[]> {
    const products = await this.prisma.product.findMany({
      where: { sellerId },
      orderBy: { createdAt: 'desc' },
      include: IMAGES_INCLUDE,
    });
    return products.map((p) => this.toDto(p));
  }

  async findOneOwn(id: string, sellerId: string): Promise<ProductDto> {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: IMAGES_INCLUDE,
    });
    if (!product) throw new NotFoundException(`Product "${id}" not found`);
    if (product.sellerId !== sellerId) throw new ForbiddenException('You do not own this product');
    return this.toDto(product);
  }

  async update(
    id: string,
    sellerId: string,
    data: { title?: string; description?: string; price?: number; categoryId?: string; city?: string },
  ): Promise<ProductDto> {
    await this.assertOwnership(id, sellerId);
    const product = await this.prisma.product.update({
      where: { id },
      data,
      include: IMAGES_INCLUDE,
    });
    return this.toDto(product);
  }

  async updateStatus(id: string, sellerId: string, status: string): Promise<ProductDto> {
    await this.assertOwnership(id, sellerId);
    const product = await this.prisma.product.update({
      where: { id },
      data: { status: status as any },
      include: IMAGES_INCLUDE,
    });
    return this.toDto(product);
  }

  async addImage(
    productId: string,
    sellerId: string,
    data: { url: string; position?: number },
  ): Promise<ProductImageDto> {
    await this.assertOwnership(productId, sellerId);
    const image = await this.prisma.productImage.create({
      data: {
        url: data.url,
        position: data.position ?? 0,
        productId,
      },
    });
    return { id: image.id, url: image.url, position: image.position };
  }

  async removeImage(productId: string, imageId: string, sellerId: string): Promise<void> {
    await this.assertOwnership(productId, sellerId);
    const image = await this.prisma.productImage.findUnique({ where: { id: imageId } });
    if (!image || image.productId !== productId) {
      throw new NotFoundException(`Image "${imageId}" not found on product "${productId}"`);
    }
    await this.prisma.productImage.delete({ where: { id: imageId } });
  }

  private async assertOwnership(productId: string, sellerId: string): Promise<void> {
    const product = await this.prisma.product.findUnique({ where: { id: productId } });
    if (!product) throw new NotFoundException(`Product "${productId}" not found`);
    if (product.sellerId !== sellerId) throw new ForbiddenException('You do not own this product');
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
