import { Response } from 'express';

interface CookieOptions {
  token: string;
  res: Response;
}

const expire_time = process.env.JWT_EXPIRATION; // JWT expiration time from env variable

export const setAuthCookie = ({ token, res }: CookieOptions): void => {
  // Check if expire_time is set, and default to 0 if not
  const maxAge = expire_time ? parseInt(expire_time) * 1000 : 0; // Expiration in milliseconds

  res.cookie('authToken', token, {
    maxAge: maxAge, // Set the expiration of the cookie
    httpOnly: true, // Ensures that the cookie can't be accessed via JavaScript (security against XSS)
    sameSite: 'strict', // Use 'lax' or 'none' based on your requirements
    secure: process.env.NODE_ENV === 'production', // Only send cookie over HTTPS in production environment
  });
};
