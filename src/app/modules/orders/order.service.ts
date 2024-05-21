import { TOrder } from './order.interface';
import { OrderModel } from './order.model';

const createOrderIntoDB = async (order: TOrder) => {
  const result = await OrderModel.create(order);
  return result;
};
const getAllOrderIntoDB = async () => {
  const result = await OrderModel.find();
  return result;
};
const searchOrderFromDB = async (searchEmail: string) => {
  const result = await OrderModel.find({ email: searchEmail });
  return result;
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrderIntoDB,
  searchOrderFromDB,
};
