import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../utils/errorHandler';
import rateLimit from 'express-rate-limit';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1d';

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not set');
}

export interface AuthenticatedRequest extends Request {
  userId?: string;
  email?: string;
}

// Rate limiting configuration
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('No authentication token provided', 401);
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new AppError('Invalid authentication token', 401);
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
      
      // Check token expiration
      if (decoded.exp && decoded.exp < Date.now() / 1000) {
        throw new AppError('Token has expired', 401);
      }

      // Add user info to request
      (req as AuthenticatedRequest).userId = decoded.userId;
      (req as AuthenticatedRequest).email = decoded.email;

      next();
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new AppError('Invalid token', 401);
      }
      if (error instanceof jwt.TokenExpiredError) {
        throw new AppError('Token has expired', 401);
      }
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

// Optional authentication middleware that doesn't require a token
export const optionalAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next();
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return next();
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
      (req as AuthenticatedRequest).userId = decoded.userId;
      (req as AuthenticatedRequest).email = decoded.email;
    } catch (error) {
      // Ignore token validation errors for optional auth
    }

    next();
  } catch (error) {
    next(error);
  }
};
