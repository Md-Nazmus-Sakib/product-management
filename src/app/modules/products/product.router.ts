import express from 'express';
import { ProductControllers } from './product.controller';

const router = express.Router();

//we call controller function

router.post('/', ProductControllers.createProduct);

router.get('/', ProductControllers.getAllProduct);

router.get('/:productId', ProductControllers.getSingleProductById);

export const ProductRoutes = router;
