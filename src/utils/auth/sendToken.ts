import { Response } from 'express';

interface CookieOptions {
  token: string;
  res: Response;
}

export const setAuthCookie = ({ token, res }: CookieOptions): void => {
  res.cookie('authToken', token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
};
