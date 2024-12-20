import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import connectDb from './config/connectDb';
import userRoutes from './route/user';
import { errorHandler } from './utils/error/ErrorHandler';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(errorHandler);

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

export const port: string | number = process.env.PORT || 3000;

app.use('/api/user', userRoutes);

connectDb();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
