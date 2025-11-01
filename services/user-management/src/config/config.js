import dotenv from 'dotenv';
dotenv.config();

export const port = process.env.PORT || 3001;
export const jwtSecret = process.env.JWT_SECRET;
export const nodeEnv = process.env.NODE_ENV || 'development';

