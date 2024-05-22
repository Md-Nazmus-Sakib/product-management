import { TProduct } from './product.interface';
import { ProductModel } from './product.model';

//get all product
const getAllProductFromDB = async () => {
  const result = await ProductModel.find();
  return result;
};

//search  product which are match
const searchItemFromDB = async (searchTerm: string) => {
  const regex = new RegExp(searchTerm, 'i');

  const searchResults = await ProductModel.find({
    $or: [
      { name: { $regex: regex } },
      { description: { $regex: regex } },
      { category: { $regex: regex } },
      { tags: { $in: [regex] } },
    ],
  });

  return searchResults;
};

//get single product by id
const getSingleProductFromDB = async (productId: string) => {
  const result = await ProductModel.findOne({ _id: productId });
  return result;
};

//create a product
const createProductIntoDB = async (product: TProduct) => {
  const result = await ProductModel.create(product);
  return result;
};

//update a product

const singleProductUpdateById = async (
  productId: string,
  productData: TProduct,
) => {
  const result = await ProductModel.findByIdAndUpdate(productId, productData, {
    new: true,
  });
  return result;
};

//delete a product
const deleteProductFromDB = async (productId: string) => {
  const result = await ProductModel.findByIdAndDelete(productId);
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  singleProductUpdateById,
  deleteProductFromDB,
  searchItemFromDB,
};
