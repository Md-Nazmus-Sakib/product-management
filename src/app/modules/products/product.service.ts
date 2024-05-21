import { TProduct } from './product.interface';
import { ProductModel } from './product.model';

//create a product
const createProductIntoDB = async (product: TProduct) => {
  const result = await ProductModel.create(product);
  return result;
};
//get all product
const getAllProductFromDB = async () => {
  const result = await ProductModel.find();
  return result;
};

//get single product by id
const getSingleProductFromDB = async (productId: string) => {
  const result = await ProductModel.findOne({ _id: productId });
  return result;
};
const singleProductUpdateById = async (productId: string, productData: any) => {
  const result = await ProductModel.findByIdAndUpdate(productId, productData, {
    new: true,
  });
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  singleProductUpdateById,
};
