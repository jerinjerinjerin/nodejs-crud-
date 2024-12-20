import bcrypt from 'bcryptjs';
import { IUser } from '../../data/data';
import User from '../../schema/user';
import { CustomError } from '../../utils/error/CustomError';
import { generateOtp } from '../../utils/auth/otp';
import { sendOtpEmail } from '../../utils/email/email';

export const createUserService = async (user: IUser) => {
  try {
    const alreadyUser = await User.findOne({ email: user.email });

    if (alreadyUser) {
      throw new CustomError('User already exists', 409);
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

    const otpNumber = generateOtp();

    const newUser = new User({
      ...user,
      otpNumber,
      password: hashPassword,
    });

    await newUser.save();

    await sendOtpEmail(user.email, otpNumber.toString(), 10);

    return newUser;
  } catch (error) {
    console.error('Error during user creation:', error);
    if (error instanceof CustomError) {
      throw error;
    }

    throw new CustomError('An unexpected error occurred', 500);
  }
};

export const verifyOtpService = async (user: IUser) => {
  try {
    const validOtp = await User.findOne({ otpNumber: user.otpNumber });

    if (!validOtp) {
      throw new CustomError('invalid otp number');
    }

    if (validOtp) {
      await User.findByIdAndUpdate(
        validOtp._id,
        { isValidUser: true },
        { new: true },
      );
    }

    return validOtp;
  } catch (error) {
    console.error('error verifying Otp', error);
    throw new CustomError('An error occurred while verifying OTP', 500);
  }
};

export const loginServic = async (user: IUser) => {
  try {
    const validEmail = await User.findOne({ email: user.email });

    if (!validEmail) {
      throw new CustomError('User not found', 400);
    }

    // Check if the user is valid (has verified OTP)
    if (validEmail.isValidUser !== true) {
      throw new CustomError('User is not verified (OTP)', 401);
    }

    const validPasssword = await bcrypt.compare(
      user.password,
      validEmail.password,
    );

    if (!validPasssword) {
      throw new CustomError('incorrect password', 400);
    }

    return validEmail;
  } catch (error) {
    console.error(error);
  }
};
