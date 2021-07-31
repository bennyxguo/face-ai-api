import { NextFunction, Request, Response } from 'express';
import { verifyToken } from './authToken';
import { AuthRequest } from './authTypes';

const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json('Unauthorized.');

  try {
    req.userId = await verifyToken(authorization);
    return next();
  } catch (err) {
    return res.status(401).json(err);
  }
};

export default auth;
