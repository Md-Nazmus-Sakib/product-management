import { z } from 'zod';

const OrderZodSchema = z.object({
  email: z.string().email(), // Validate email format
  productId: z.string(),
  price: z.number().positive(), // Ensure price is positive
  quantity: z.number().min(1), // Ensure quantity is at least 1
});

export default OrderZodSchema;
