import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type {
  SellerOrderListItemDto,
  SellerOrderDetailsDto,
  SellerOrderBuyerDto,
  SellerOrderItemDto,
} from '@bun-bun/shared';
import { OrderStatus } from '@bun-bun/shared';

const ORDER_INCLUDE = {
  orderItems: {
    include: {
      product: { select: { titleRo: true, titleRu: true } },
    },
  },
  orderGroup: {
    include: {
      buyer: { select: { id: true, email: true, name: true, phone: true } },
    },
  },
} as const;

// Allowed status transitions
const TRANSITIONS: Record<string, string[]> = {
  PENDING: ['CONFIRMED', 'CANCELLED'],
  CONFIRMED: ['DELIVERED'],
};

@Injectable()
export class SellerOrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async listOrders(sellerId: string): Promise<SellerOrderListItemDto[]> {
    const orders = await this.prisma.order.findMany({
      where: { sellerId },
      include: ORDER_INCLUDE,
      orderBy: { createdAt: 'desc' },
    });

    return orders.map((order) => {
      const total = order.orderItems.reduce(
        (sum, oi) => sum + oi.qty * oi.priceSnapshot,
        0,
      );
      const buyer = order.orderGroup.buyer;
      return {
        id: order.id,
        status: order.status as OrderStatus,
        createdAt: order.createdAt.toISOString(),
        buyer: {
          id: buyer.id,
          name: buyer.name,
          email: buyer.email,
          phone: buyer.phone || undefined,
        },
        itemsCount: order.orderItems.length,
        total,
      };
    });
  }

  async getOrder(orderId: string, sellerId: string): Promise<SellerOrderDetailsDto> {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: ORDER_INCLUDE,
    });

    if (!order || order.sellerId !== sellerId) {
      throw new NotFoundException(`Order "${orderId}" not found`);
    }

    const buyer = order.orderGroup.buyer;
    const buyerDto: SellerOrderBuyerDto = {
      id: buyer.id,
      name: buyer.name,
      email: buyer.email,
      phone: buyer.phone || undefined,
    };

    const items: SellerOrderItemDto[] = order.orderItems.map((oi) => ({
      id: oi.id,
      productId: oi.productId,
      productTitleRo: oi.product.titleRo,
      productTitleRu: oi.product.titleRu,
      qty: oi.qty,
      priceSnapshot: oi.priceSnapshot,
    }));

    const total = items.reduce((sum, i) => sum + i.qty * i.priceSnapshot, 0);

    return {
      id: order.id,
      status: order.status as OrderStatus,
      createdAt: order.createdAt.toISOString(),
      buyer: buyerDto,
      items,
      total,
    };
  }

  async updateStatus(
    orderId: string,
    sellerId: string,
    newStatus: string,
  ): Promise<SellerOrderDetailsDto> {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order || order.sellerId !== sellerId) {
      throw new NotFoundException(`Order "${orderId}" not found`);
    }

    const allowed = TRANSITIONS[order.status];
    if (!allowed || !allowed.includes(newStatus)) {
      throw new BadRequestException(
        `Cannot transition from ${order.status} to ${newStatus}`,
      );
    }

    await this.prisma.order.update({
      where: { id: orderId },
      data: { status: newStatus as any },
    });

    return this.getOrder(orderId, sellerId);
  }
}
