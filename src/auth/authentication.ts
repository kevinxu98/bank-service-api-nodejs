import { Request } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const supabaseJwtSecret = process.env.SUPABASE_JWT_SECRET!;

export const expressAuthentication = async (request: Request, securityName: string, scopes?: string[]): Promise<any> => {
    if (securityName === 'jwt') {
        const token = request.header('Authorization')?.split(' ')[1];
        if (!token) {
            throw new Error('No token provided.');
        }

        try {
            const decoded = jwt.verify(token, supabaseJwtSecret);
            return decoded;
        } catch (err) {
            throw new Error('Invalid token.');
        }
    }
    throw new Error('Unsupported security name.');
};