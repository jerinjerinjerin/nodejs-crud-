import bcrypt from 'bcryptjs';
import { IUser } from '../../data/data';
import User from '../../schema/user';
import { CustomError } from '../../utils/CustomError';

export const createUserService = async (user: IUser) => {
  try {
    const alreadyUser = await User.findOne({ email: user.email });

    if (alreadyUser) {
      throw new CustomError('User already exists', 409); // Directly throw the error
    }

    if (user.email === process.env.ADMIN_EMAIL) {
      user.role = 'ADMIN';
    }

    if (
      !user.name ||
      !user.name.trim() ||
      !user.password ||
      !user.password.trim() ||
      !user.email ||
      !user.email.trim()
    ) {
      throw new CustomError(
        'All fields (name, email, password) must be provided',
        400,
      );
    }

    const hashPassword = await bcrypt.hash(user.password, 10);

    const newUser = new User({
      ...user,
      password: hashPassword,
    });

    await newUser.save();

    return newUser;
  } catch (error) {
    // Don't rethrow, just return the error to the middleware
    console.error('Error during user creation:', error);
    if (error instanceof CustomError) {
      throw error; // Propagate the custom error
    }

    // For any unexpected error
    throw new CustomError('An unexpected error occurred', 500);
  }
};
