import { Response } from 'express';

interface CookieOptions {
  token: string;
  res: Response;
}

const expire_time = process.env.JWT_EXPIRATION;

export const setAuthCookie = ({ token, res }: CookieOptions): void => {
  const maxAge = expire_time ? parseInt(expire_time) * 1000 : 0;

  res.cookie('authToken', token, {
    maxAge: maxAge,
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });
};
