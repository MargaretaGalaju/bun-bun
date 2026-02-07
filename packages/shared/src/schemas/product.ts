import { z } from 'zod';

export const createProductSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().min(1, 'Description is required').max(5000),
  price: z.number().positive('Price must be positive'),
  categoryId: z.string().uuid('Invalid category ID'),
  city: z.string().max(100).optional(),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;

export const updateProductSchema = createProductSchema.partial();

export type UpdateProductInput = z.infer<typeof updateProductSchema>;

export const updateProductStatusSchema = z.object({
  status: z.enum(['DRAFT', 'ACTIVE', 'HIDDEN']),
});

export type UpdateProductStatusInput = z.infer<typeof updateProductStatusSchema>;

export const addProductImageSchema = z.object({
  url: z.string().url('Invalid image URL'),
  position: z.number().int().min(0).optional(),
});

export type AddProductImageInput = z.infer<typeof addProductImageSchema>;
