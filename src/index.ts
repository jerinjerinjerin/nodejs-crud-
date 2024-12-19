import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDb from './config/connectDb';

dotenv.config();

const app = express();
// src/index.ts

export const port: string | number = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send({ message: 'Hello, World!' });
});

connectDb();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
