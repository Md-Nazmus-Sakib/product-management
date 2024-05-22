import { z } from 'zod';

const variantsZodSchema = z.object({
  type: z.string().nonempty({ message: 'Type is required' }),
  value: z.string().nonempty({ message: 'Value is required' }),
});

// Define Zod schema for inventory
const inventoryZodSchema = z.object({
  quantity: z
    .number()
    .int()
    .positive({ message: 'Quantity must be a positive integer' }),
  inStock: z.boolean(),
});

const productZodSchema = z.object({
  name: z.string().nonempty({ message: 'Name is required' }),
  description: z.string().nonempty({ message: 'Description is required' }),
  price: z.number().positive({ message: 'Price must be a positive number' }),
  category: z.string().nonempty({ message: 'Category is required' }),
  tags: z.array(z.string()),
  variants: z.array(variantsZodSchema),
  inventory: inventoryZodSchema,
});

// Export the Zod schemas
export default productZodSchema;
