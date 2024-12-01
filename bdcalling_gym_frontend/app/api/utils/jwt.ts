import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'secret123';

export const generateToken = (payload: object, expiresIn = '1d') =>
  jwt.sign(payload, SECRET_KEY, { expiresIn });

export const verifyToken = (token: string) =>
  jwt.verify(token, SECRET_KEY);
