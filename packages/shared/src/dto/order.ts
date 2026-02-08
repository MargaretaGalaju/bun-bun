import { OrderStatus, OrderGroupStatus } from '../enums';

// ── Checkout request / response ─────────────────────────────────

export interface CheckoutItemDto {
  productId: string;
  qty: number;
}

export interface CheckoutRequestDto {
  items: CheckoutItemDto[];
}

export interface CheckoutOrderResponseDto {
  orderId: string;
  sellerId: string;
  itemsCount: number;
}

export interface CheckoutResponseDto {
  orderGroupId: string;
  orders: CheckoutOrderResponseDto[];
}

// ── Read DTOs (GET /orders/my) ──────────────────────────────────

export interface OrderItemDto {
  id: string;
  productId: string;
  productTitle: string;
  qty: number;
  priceSnapshot: number;
}

export interface OrderDto {
  id: string;
  sellerId: string;
  status: OrderStatus;
  items: OrderItemDto[];
  total: number;
  createdAt: string;
}

export interface OrderGroupDto {
  id: string;
  status: OrderGroupStatus;
  orders: OrderDto[];
  total: number;
  createdAt: string;
}

// ── Seller order DTOs ───────────────────────────────────────────

export interface SellerOrderBuyerDto {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export interface SellerOrderListItemDto {
  id: string;
  status: OrderStatus;
  createdAt: string;
  buyer: SellerOrderBuyerDto;
  itemsCount: number;
  total: number;
}

export interface SellerOrderItemDto {
  id: string;
  productId: string;
  productTitle: string;
  qty: number;
  priceSnapshot: number;
}

export interface SellerOrderDetailsDto {
  id: string;
  status: OrderStatus;
  createdAt: string;
  buyer: SellerOrderBuyerDto;
  items: SellerOrderItemDto[];
  total: number;
}

export interface UpdateSellerOrderStatusDto {
  status: 'CONFIRMED' | 'CANCELLED' | 'DELIVERED';
}
