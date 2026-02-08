import type {
  SellerOrderListItemDto,
  SellerOrderDetailsDto,
} from '@bun-bun/shared';
import { apiFetch } from './client';

export function listSellerOrders(): Promise<SellerOrderListItemDto[]> {
  return apiFetch<SellerOrderListItemDto[]>('/seller/orders');
}

export function getSellerOrder(id: string): Promise<SellerOrderDetailsDto> {
  return apiFetch<SellerOrderDetailsDto>(`/seller/orders/${id}`);
}

export function updateSellerOrderStatus(
  id: string,
  status: string,
): Promise<SellerOrderDetailsDto> {
  return apiFetch<SellerOrderDetailsDto>(`/seller/orders/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}
