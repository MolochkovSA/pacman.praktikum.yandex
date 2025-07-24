import { Request, Response } from 'express';
import { splitCookiesString } from 'set-cookie-parser';
import { authService } from '../services/auth.service';

const signIn = async (req: Request, res: Response) => {
  try {
    const response = await authService.signIn(req.body);
    const rawSetCookie = response.headers.get('set-cookie');

    if (rawSetCookie) {
      const cookies = splitCookiesString(rawSetCookie);
      res.setHeader('Set-Cookie', cookies);
    }

    return res.status(response.status).end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const logout = async (_: Request, res: Response) => {
  try {
    const response = await authService.logout();
    const rawSetCookie = response.headers.get('set-cookie');

    if (rawSetCookie) {
      const cookies = splitCookiesString(rawSetCookie);
      res.setHeader('Set-Cookie', cookies);
    }

    return res.status(response.status).end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const authController = { signIn, logout };
