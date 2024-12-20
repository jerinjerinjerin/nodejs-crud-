import { Document } from 'mongoose';

export interface userDocument extends Document {
  name: string;
  email: string;
  password: string;
  avatarUrl: string;
  role: string;
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  avatarUrl?: string;
  role?: string;
}
