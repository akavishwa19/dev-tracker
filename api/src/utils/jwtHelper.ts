import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not set');
}

if (!JWT_EXPIRATION) {
  throw new Error('JWT_EXPIRATION is not set');
}


export const generateJWTToken = (userId: string, email: string): string => {
  return jwt.sign({ userId, email }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
};