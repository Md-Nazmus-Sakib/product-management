import { Schema, model } from 'mongoose';
export type TOrder = {
  email: string;
  productId: string;
  price: number;
  quantity: number;
};
