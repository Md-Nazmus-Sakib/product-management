import { TOrder } from './order.interface';
import { OrderModel } from './order.model';

//all order show
const getAllOrderIntoDB = async () => {
  const result = await OrderModel.find();
  return result;
};

//only show the order which is match by email
const searchOrderFromDB = async (searchEmail: string) => {
  const result = await OrderModel.find({ email: searchEmail });
  return result;
};

//create a new order
const createOrderIntoDB = async (order: TOrder) => {
  const result = await OrderModel.create(order);
  return result;
};
export const OrderServices = {
  createOrderIntoDB,
  getAllOrderIntoDB,
  searchOrderFromDB,
};
