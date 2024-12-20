import { Request, Response, NextFunction } from 'express';
import { CustomError } from './CustomError';

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  next: NextFunction, // Keep next even if unused
): void => {
  if (err instanceof CustomError) {
    // Handle CustomErrors
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      details: err.details || null, // Include details if provided
    });
  } else {
    // Handle general errors
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: err instanceof Error ? err.message : 'Unknown error', // Include message of the error
    });
  }
  next(err);
};
