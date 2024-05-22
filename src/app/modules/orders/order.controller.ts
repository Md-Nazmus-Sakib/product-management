import { Request, Response } from 'express';
import { OrderServices } from './order.service';
import { ProductModel } from '../products/product.model';
import OrderZodSchema from './order.validation';

//all order and search by email order
const allOrder = async (req: Request, res: Response) => {
  const searchEmail = req.query.email as string;
  console.log(searchEmail);

  try {
    if (searchEmail === undefined) {
      const result = await OrderServices.getAllOrderIntoDB();
      if (result.length > 0) {
        res.status(200).json({
          success: true,
          message: 'Orders fetched successfully',
          data: result,
        });
      } else {
        res.status(200).json({
          success: true,
          message: 'No orders found',
          data: [],
        });
      }
    } else if (searchEmail) {
      const result = await OrderServices.searchOrderFromDB(searchEmail);
      if (result.length > 0) {
        res.status(200).json({
          success: true,
          message: `Orders fetched successfully for email: ${searchEmail}`,
          data: result,
        });
      } else {
        res.status(200).json({
          success: true,
          message: `No orders found for email: ${searchEmail}`,
          data: [],
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: 'Invalid search term',
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
    });
  }
};

//create order if product is available

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;

    const zodOrderValidation = OrderZodSchema.parse(orderData);

    // Find the product by ID
    const product = await ProductModel.findById(zodOrderValidation.productId);

    // If product not found, return 404
    if (!product) {
      return res.status(404).json({
        error: 'Product not found',
      });
    }

    // Check if there is enough quantity
    if (product.inventory.quantity < zodOrderValidation.quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient quantity available in inventory',
      });
    }

    // Update the product quantity
    product.inventory.quantity -= zodOrderValidation.quantity;

    // Update the inStock status
    product.inventory.inStock = product.inventory.quantity > 0;

    // Save the updated product
    await product.save();

    // Save the order
    const result = await OrderServices.createOrderIntoDB(zodOrderValidation);

    res.status(201).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'An error occurred while creating the order.',
    });
  }
};

export const OrderControllers = {
  createOrder,
  allOrder,
};
