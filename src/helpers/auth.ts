import { Request, Response, NextFunction } from 'express';
import { verifyToken } from './generateTokenUser';

/**
 * Verify that the user has the signing token
 * @param header Header with token
 * @param res Response
 * @param next Next function
 * @returns Nothing in case the token is correct or error response from the server
 */
export const checkAuth = async ({ headers }: Request, res: Response, next: NextFunction) => {
  const { authorization } = headers;
  if (authorization && authorization.startsWith('Bearer ')){
    verifyToken(authorization.slice(7));
    next();
    return;
  }
  return res.status(401).json({ Error: ' Acces denied ❌' });
}


