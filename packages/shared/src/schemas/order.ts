import { z } from 'zod';

export const checkoutItemSchema = z.object({
  productId: z.string().uuid('Invalid product ID'),
  qty: z.number().int('Quantity must be an integer').min(1, 'Quantity must be at least 1'),
});

export const checkoutRequestSchema = z
  .object({
    items: z.array(checkoutItemSchema).min(1, 'At least one item is required'),
  })
  .transform((data) => {
    // Merge duplicate productIds by summing qty
    const merged = new Map<string, number>();
    for (const item of data.items) {
      merged.set(item.productId, (merged.get(item.productId) || 0) + item.qty);
    }
    return {
      items: Array.from(merged.entries()).map(([productId, qty]) => ({
        productId,
        qty,
      })),
    };
  });

export type CheckoutRequestInput = z.infer<typeof checkoutRequestSchema>;

// ── Seller order status update ──────────────────────────────────

export const updateSellerOrderStatusSchema = z.object({
  status: z.enum(['CONFIRMED', 'CANCELLED', 'DELIVERED']),
});

export type UpdateSellerOrderStatusInput = z.infer<typeof updateSellerOrderStatusSchema>;
