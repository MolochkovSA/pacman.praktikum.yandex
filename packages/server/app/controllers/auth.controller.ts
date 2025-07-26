import { Request, Response } from 'express';
import { splitCookiesString } from 'set-cookie-parser';
import { authService } from '../services/auth.service';

const me = async (req: Request, res: Response) => {
  try {
    const { authCookie, uuid } = req.cookies;

    const response = await authService.me({ authCookie, uuid });
    const data = await response.json();

    return res.status(response.status).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const signIn = async (req: Request, res: Response) => {
  try {
    const response = await authService.signIn(req.body);
    const rawSetCookie = response.headers.get('set-cookie');

    if (rawSetCookie) {
      const cookies = splitCookiesString(rawSetCookie);

      const cleanCookies = cookies.map((cookie) => {
        let cleaned = cookie.replace(/Domain=ya-praktikum\.tech;? ?/gi, '');
        return cleaned;
      });

      res.setHeader('Set-Cookie', cleanCookies);
    }

    return res.status(response.status).end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const logout = async (req: Request, res: Response) => {
  try {
    const { authCookie, uuid } = req.cookies;

    const response = await authService.logout({ authCookie, uuid });
    const rawSetCookie = response.headers.get('set-cookie');

    if (rawSetCookie) {
      const cookies = splitCookiesString(rawSetCookie);

      const cleanCookies = cookies.map((cookie) => {
        let cleaned = cookie.replace(/Domain=ya-praktikum\.tech;? ?/gi, '');
        return cleaned;
      });

      res.setHeader('Set-Cookie', cleanCookies);
    }

    return res.status(response.status).end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const authController = { signIn, logout, me };
