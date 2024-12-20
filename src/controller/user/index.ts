import { NextFunction, Request, Response } from 'express';
import _ from 'lodash';
import { IUser } from '../../data/data';
import { createUserService } from '../../service/user';
import { setAuthCookie } from '../../utils/auth/sendToken';
import { generateToken } from '../../utils/auth/jwt';

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

    const payload = { email: user.email }; // Define the payload for JWT

    const token = generateToken(payload); // Generate JWT token

    setAuthCookie({ token, res }); // Set the token as an HttpOnly cookie

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: userWithoutPassword,
      token: token,
    });
  } catch (error) {
    console.error(error);
    next(error); // Pass the error to the global error handler
  }
};
