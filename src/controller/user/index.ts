import { NextFunction, Request, Response } from 'express';
import _ from 'lodash';
import { IUser } from '../../data/data';
import {
  createUserService,
  loginServic,
  verifyOtpService,
} from '../../service/user';
import { setAuthCookie } from '../../utils/auth/sendToken';
import { generateToken } from '../../utils/auth/jwt';
import { CustomError } from '../../utils/error/CustomError';

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user: IUser = req.body;

    if (req.file) {
      user.avatarUrl = req.file.path;
    }

    const newUser = await createUserService(user);

    const userWithoutPassword = _.omit(newUser.toObject(), ['password']);

    const payload = { email: user.email };
    const token = generateToken(payload);

    setAuthCookie({ token, res });

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: userWithoutPassword,
      token: token,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const verifyOtp = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { otpNumber } = req.body;

    if (!otpNumber) {
      throw new CustomError('otp number required', 400);
    }

    const validOtpNumber = await verifyOtpService({
      otpNumber,
    } as unknown as IUser);

    const verifyonOtp = _.omit(validOtpNumber.toObject(), ['password']);

    res.status(200).json({
      success: true,
      message: 'otp verification success',
      otpNumber: verifyonOtp,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await loginServic({ email, password } as unknown as IUser);

    if (!user) {
      throw new CustomError('Invalid login credentials', 401);
    }
    const loginUser = _.omit(user.toObject(), ['password']);

    const payload = { email: user.email };
    const token = generateToken(payload);

    setAuthCookie({ token, res });

    res.status(201).json({
      success: true,
      message: 'User logged in successfully',
      data: loginUser,
      authToken: token,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
