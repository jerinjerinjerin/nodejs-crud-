import { NextFunction, Request, Response } from 'express';
import { createUserService } from '../../service/user';

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = req.body;

    // Call the service to create the user
    const newUser = await createUserService(user);

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: newUser,
    });
  } catch (error) {
    // Pass the error to the error handling middleware
    console.error('Error during user creation:', error);
    next(error); // This forwards the error to the errorHandler middleware
  }
};
