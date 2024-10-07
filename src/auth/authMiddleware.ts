import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const supabaseJwtSecret = process.env.SUPABASE_JWT_SECRET;

if (!supabaseJwtSecret) {
  throw new Error('SUPABASE_JWT_SECRET is not defined in .env file.');
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: string | jwt.JwtPayload;
  }
}

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token is missing or invalid.' });
  }

  try {
    const decoded = jwt.verify(token, supabaseJwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token.' });
  }
};