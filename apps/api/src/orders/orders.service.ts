import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type {
  CheckoutResponseDto,
  OrderGroupDto,
  OrderDto,
  OrderItemDto,
} from '@bun-bun/shared';
import { OrderStatus, OrderGroupStatus } from '@bun-bun/shared';

interface CheckoutItem {
  productId: string;
  qty: number;
}

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async checkout(buyerId: string, items: CheckoutItem[]): Promise<CheckoutResponseDto> {
    // 1. Merge duplicate productIds
    const merged = new Map<string, number>();
    for (const item of items) {
      merged.set(item.productId, (merged.get(item.productId) || 0) + item.qty);
    }
    const mergedItems = Array.from(merged.entries()).map(([productId, qty]) => ({
      productId,
      qty,
    }));

    const productIds = mergedItems.map((i) => i.productId);

    // 2. Load all products in one query
    const products = await this.prisma.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true, titleRo: true, titleRu: true, price: true, status: true, sellerId: true },
    });

    // 3. Validate: all products exist
    const foundIds = new Set(products.map((p) => p.id));
    const missingIds = productIds.filter((id) => !foundIds.has(id));
    if (missingIds.length > 0) {
      throw new BadRequestException(`Products not found: ${missingIds.join(', ')}`);
    }

    // 4. Validate: all products are ACTIVE
    const inactiveProducts = products.filter((p) => p.status !== 'ACTIVE');
    if (inactiveProducts.length > 0) {
      const inactiveIds = inactiveProducts.map((p) => p.id);
      throw new BadRequestException(
        `Products not available for purchase (not ACTIVE): ${inactiveIds.join(', ')}`,
      );
    }

    // 5. Build a lookup map and group items by sellerId
    const productMap = new Map(products.map((p) => [p.id, p]));
    const sellerGroups = new Map<string, { productId: string; qty: number; price: number }[]>();

    for (const item of mergedItems) {
      const product = productMap.get(item.productId)!;
      const group = sellerGroups.get(product.sellerId) || [];
      group.push({ productId: item.productId, qty: item.qty, price: product.price });
      sellerGroups.set(product.sellerId, group);
    }

    // 6. Create everything in a single transaction
    const result = await this.prisma.$transaction(async (tx) => {
      // Create OrderGroup
      const orderGroup = await tx.orderGroup.create({
        data: { buyerId, status: 'NEW' },
      });

      // Create an Order + OrderItems per seller
      const orders: { orderId: string; sellerId: string; itemsCount: number }[] = [];

      for (const [sellerId, groupItems] of sellerGroups) {
        const order = await tx.order.create({
          data: {
            orderGroupId: orderGroup.id,
            sellerId,
            status: 'PENDING',
            orderItems: {
              createMany: {
                data: groupItems.map((gi) => ({
                  productId: gi.productId,
                  qty: gi.qty,
                  priceSnapshot: gi.price,
                })),
              },
            },
          },
        });

        orders.push({
          orderId: order.id,
          sellerId,
          itemsCount: groupItems.length,
        });
      }

      return { orderGroupId: orderGroup.id, orders };
    });

    return result;
  }

  async getMyOrderGroups(buyerId: string): Promise<OrderGroupDto[]> {
    const groups = await this.prisma.orderGroup.findMany({
      where: { buyerId },
      include: {
        orders: {
          include: {
            orderItems: {
              include: {
                product: { select: { titleRo: true, titleRu: true } },
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return groups.map((group) => {
      const orders: OrderDto[] = group.orders.map((order) => {
        const items: OrderItemDto[] = order.orderItems.map((oi) => ({
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
          sellerId: order.sellerId,
          status: order.status as OrderStatus,
          items,
          total,
          createdAt: order.createdAt.toISOString(),
        };
      });

      const groupTotal = orders.reduce((sum, o) => sum + o.total, 0);

      return {
        id: group.id,
        status: group.status as OrderGroupStatus,
        orders,
        total: groupTotal,
        createdAt: group.createdAt.toISOString(),
      };
    });
  }
}
