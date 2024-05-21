import express from 'express';
import { OrderControllers } from './order.controller';

const router = express.Router();

router.post('/', OrderControllers.createOrder);

router.get('/', OrderControllers.allOrder);

export const OrderRoutes = router;
