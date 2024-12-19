import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// TypeScript requires us to handle potentially undefined values for env variables
const connectionString: string | undefined = process.env.DB_URL;

const connectDb = async () => {
  if (!connectionString) {
    throw new Error('Database URL is not defined in environment variables');
  }

  try {
    await mongoose.connect(connectionString);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
};

export default connectDb;
