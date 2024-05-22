import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import productZodSchema from './product.validation';

//get all product and search product

const getAllProduct = async (req: Request, res: Response) => {
  const searchTerm = req.query.searchTerm as string;

  try {
    //if no search field then show all data
    if (searchTerm === undefined) {
      const result = await ProductServices.getAllProductFromDB();
      res.status(200).json({
        success: true,
        message: 'Products fetched successfully!',
        data: result,
      });
    }
    //if searchField have any value the show which is match.
    else if (searchTerm) {
      const result = await ProductServices.searchItemFromDB(
        searchTerm as string,
      );
      //If search value is correct and find any value then return the value
      if (result.length > 0) {
        res.status(200).json({
          success: true,
          message: `Products matching search term '${searchTerm}' fetched successfully!`,
          data: result,
        });
      }
      //if search field don't found any value then return this message
      else {
        res.status(200).json({
          success: true,
          message: `No products found matching search term '${searchTerm}'.`,
          data: result,
        });
      }
    }
    //if search an empty field then return the message
    else {
      res.status(400).json({
        success: false,
        message: 'Search term cannot be empty.',
      });
    }
  } catch (err) {
    //if any error occurred then show this message
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching products.',
    });
  }
};

//get single product by id
const getSingleProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getSingleProductFromDB(productId);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Product not found.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching the product.',
    });
  }
};

//Create a product

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;

    const zodValidationProduct = productZodSchema.parse(productData);
    const result =
      await ProductServices.createProductIntoDB(zodValidationProduct);

    res.status(201).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'An error occurred while creating the product.',
    });
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

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Product not found.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'An error occurred while updating the product.',
    });
  }
};

//Delete product
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.deleteProductFromDB(productId);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Product not found.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: null,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'An error occurred while deleting the product.',
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProduct,
  getSingleProductById,
  updateProduct,
  deleteProduct,
};
