import { z } from 'zod';

export const createProductSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().min(1, 'Description is required').max(5000),
  price: z.number().positive('Price must be positive'),
  categoryId: z.string().uuid('Invalid category ID'),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
