/* eslint-disable @typescript-eslint/no-unused-vars */
import cors from 'cors';
import express from 'express';

import { Routes } from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
const app = express();

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
  });
});

app.use(cors());
app.use(express.json());

app.use('/api', Routes);
app.use(globalErrorHandler);
app.use(notFound);
export default app;



