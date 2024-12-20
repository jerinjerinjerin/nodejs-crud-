import jwt from 'jsonwebtoken';

const secret_key = process.env.JWT_SECRET_KEY;
const expire_time = process.env.JWT_EXPIRATION;

if (!secret_key) {
  throw new Error('JWT Secret Key is missing');
}

if (!expire_time) {
  throw new Error('JWT Expiration time is missing');
}

// Function to generate JWT token
export const generateToken = (payload: object): string => {
  return jwt.sign(payload, secret_key!, { expiresIn: expire_time });
};
