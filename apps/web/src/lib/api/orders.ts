import type {
  CheckoutResponseDto,
  OrderGroupDto,
} from '@bun-bun/shared';
import { apiFetch } from './client';

export function checkout(
  items: { productId: string; qty: number }[],
): Promise<CheckoutResponseDto> {
  return apiFetch<CheckoutResponseDto>('/orders/checkout', {
    method: 'POST',
    body: JSON.stringify({ items }),
  });
}

export function getMyOrders(): Promise<OrderGroupDto[]> {
  return apiFetch<OrderGroupDto[]>('/orders/my');
}
