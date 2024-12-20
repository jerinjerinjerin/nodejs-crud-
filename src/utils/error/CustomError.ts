export class CustomError extends Error {
  public statusCode: number;
  public details?: Record<string, unknown>;

  constructor(
    message: string,
    statusCode: number = 500,
    details?: Record<string, unknown>,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
