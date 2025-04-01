import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  // TODO: If the user exists and the password is correct, return a JWT token

  //extraction of username and password from the request body
  const { username, password } = req.body;
  const user = await User.findOne({
    where: { username },
  });

  //if there is no user then send 401 error code 
  if (!user) {
    return res.status(401).json({ message: 'Authentication failed' });
  }
  const passwordIsValid = await bcrypt.compare(password, user.password);
  if (!passwordIsValid) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  //gets the secret key from the env
  const secretKey = process.env.JWT_SECRET_KEY || '';
  //creates a JWT token for the user
  const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
  return res.json ({ token });
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
