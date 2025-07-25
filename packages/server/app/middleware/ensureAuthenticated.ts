import { NextFunction, Request, Response } from 'express';
import * as console from 'node:console';

const AUTH_SERVICE_URL = 'https://ya-praktikum.tech/api/v2/auth/user';

export const ensureAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  const authCookie = req.cookies.authCookie;
  const uuid = req.cookies.uuid;

  if (!authCookie || !uuid) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  try {
    const response = await fetch(AUTH_SERVICE_URL, {
      headers: {
        Cookie: `authCookie=${authCookie}; uuid=${uuid}`
      }
    });

    if (!response.ok) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    return next();
  } catch (error) {
    console.error('Auth error:', error);
    res.status(500).json({ error: 'Auth service error' });
  }
};
