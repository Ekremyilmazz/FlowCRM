import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export interface AuthenticatedRequest extends Request {
    user?: any;
}

export const verifyToken = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): void => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        res.status(401).json({ message: 'Unauthorized: No token provided'});
        return;
    }

    const token = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token, JWT_SECRET as string) as JwtPayload;
        req.user= decoded;
        next();
    }catch (err){
        res.status(401).json({ message: 'Unauthorized: Invalid token'});
        return;
    }
};

export const requireRole = (role: string): RequestHandler => {
    return (req, res, next): void => {
      const user = req.user as JwtPayload;
      if (user.role !== role) {
        res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
        return;
    }
      next();
    };
  };
  