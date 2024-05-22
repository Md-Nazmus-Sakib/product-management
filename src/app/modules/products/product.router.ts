import express from 'express';
import { ProductControllers } from './product.controller';

const router = express.Router();

//we call controller function

//all product show route
router.get('/', ProductControllers.getAllProduct);

//single Product show by id
router.get('/:productId', ProductControllers.getSingleProductById);

//create a product
router.post('/', ProductControllers.createProduct);

// update a product
router.put('/:productId', ProductControllers.updateProduct);

//delete a product
router.delete('/:productId', ProductControllers.deleteProduct);

export const ProductRoutes = router;
