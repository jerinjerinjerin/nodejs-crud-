import { Document } from 'mongoose';

export interface userDocument extends Document {
  name: string;
  email: string;
  password: string;
  avatarUrl: string;
  role: string;
  otpNumber: number;
  isValidUser: boolean;
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  avatarUrl?: string;
  role?: string;
  otpNumber?: number;
  isValidUser?: boolean;
}
