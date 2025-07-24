import { Request, Response } from 'express';
import { authService } from '../services/auth.service';

const signIn = async (req: Request, res: Response) => {
  try {
    await authService.signIn(req.body);
    return res.json({ message: 'User signed in' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const authController = { signIn };
