import express from 'express';
import { OrderControllers } from './order.controller';

const router = express.Router();

//get all order and search order by email
router.get('/', OrderControllers.allOrder);

//create an order
router.post('/', OrderControllers.createOrder);

export const OrderRoutes = router;
