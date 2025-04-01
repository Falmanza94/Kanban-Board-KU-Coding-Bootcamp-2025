import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // TODO: verify the token exists and add the user data to the request object

  //this line is trying to access the Authorization header
  const authHeader = req.headers.authorization;
  //this whole if statement checks whether the Authorization header is present.. if not then the response is a 401 error
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    const secretKey = process.env.JWT_SECRET_KEY || '';
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user as JwtPayload;
      return next();
    });
    // this else statement is the error code which when invalid credentials are submitted the middleware sends a 401
  } else {
    res.sendStatus(401)
  }
};
