import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProductRoutes } from './app/modules/products/product.router';
import { OrderRoutes } from './app/modules/orders/order.route';
const app: Application = express();

app.use(express.json());
app.use(cors());

const getAController = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message:
      'Welcome to the Product and Order API! Use /api/products or /api/orders to access resources.',
  });
};
app.get('/', getAController);

app.use('/api/products', ProductRoutes);
app.use('/api/orders', OrderRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

export default app;
