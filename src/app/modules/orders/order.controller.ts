import { Request, Response } from 'express';
import { OrderServices } from './order.service';

// const allOrder = async (req: Request, res: Response) => {
//     try {
//       const result = await OrderServices.getAllOrderIntoDB();

//       res.status(200).json({
//         success: true,
//         message: 'Orders fetched successfully!',
//         data: result,
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   };

const allOrder = async (req: Request, res: Response) => {
  const searchEmail = req.query.email as string;
  console.log(searchEmail);

  try {
    if (searchEmail === undefined) {
      const result = await OrderServices.getAllOrderIntoDB();
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully!',
        data: result,
      });
    } else if (searchEmail) {
      const result = await OrderServices.searchOrderFromDB(searchEmail);
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully for user email!',
        data: result,
      });
    } else {
      res.status(200).json({
        success: true,
        message: `Products matching search term '${searchEmail}' fetched successfully!`,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const result = await OrderServices.createOrderIntoDB(orderData);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const OrderControllers = {
  createOrder,
  allOrder,
};
