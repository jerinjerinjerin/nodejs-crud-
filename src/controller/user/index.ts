import { NextFunction, Request, Response } from 'express';
import { IUser } from '../../data/data';
import { createUserService } from '../../service/user';

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user: IUser = req.body;

    if (req.file) {
      user.avatarUrl = req.file.path; // Store the image path in the user object
    }

    const newUser = await createUserService(user);

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: newUser,
    });
  } catch (error) {
    console.error(error);
    next(error); // Pass the error to the global error handler
  }
};
