import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProductRoutes } from './app/modules/products/product.router';
import { OrderRoutes } from './app/modules/orders/order.route';
const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/app/products', ProductRoutes);
app.use('/app/orders', OrderRoutes);

const getAController = (req: Request, res: Response) => {
  res.send('Hello World!');
};

app.get('/', getAController);

export default app;
