import { Request, Response } from 'express';
import { ProductServices } from './product.service';

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const result = await ProductServices.createProductIntoDB(productData);
    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

//get all product

const getAllProduct = async (req: Request, res: Response) => {
  const searchTerm = req.query.searchTerm as string;

  try {
    if (searchTerm === undefined) {
      const result = await ProductServices.getAllProductFromDB();
      res.status(200).json({
        success: true,
        message: 'Products fetched successfully!',
        data: result,
      });
    } else if (searchTerm) {
      const result = await ProductServices.searchItemFromDB(searchTerm);
      res.status(200).json({
        success: true,
        message: `Products matching search term '${searchTerm}' fetched successfully!`,
        data: result,
      });
    } else {
      res.status(200).json({
        success: true,
        message: `Products matching search term '${searchTerm}' fetched successfully!`,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

//get single product by id
const getSingleProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getSingleProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

//update product
const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const productData = req.body;
    const result = await ProductServices.singleProductUpdateById(
      productId,
      productData,
    );
    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

//Delete product
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    let result = await ProductServices.deleteProductFromDB(productId);
    result = null;
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const ProductControllers = {
  createProduct,
  getAllProduct,
  getSingleProductById,
  updateProduct,
  deleteProduct,
};
