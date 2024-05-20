import { Schema, model, connect } from 'mongoose';
import { Inventory, Product, Variant } from './product.interface';

const variantsSchema = new Schema<Variant>({
  type: { type: String },
  value: { type: String },
});

const inventorySchema = new Schema<Inventory>({
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, default: true },
});

const productSchema = new Schema<Product>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: [{ type: String }],
  variants: [variantsSchema],
  inventory: inventorySchema,
});

export const ProductModel = model<Product>('Product', productSchema);
