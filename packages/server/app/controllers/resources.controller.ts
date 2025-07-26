import { Request, Response } from 'express';
import { resourcesService } from '../services/resources.service';

const getAvatar = async (req: Request, res: Response) => {
  try {
    const { authCookie, uuid } = req.cookies;

    const pathWithoutApiPrefix = req.originalUrl.replace(/^\/api\/v2/, '');

    const response = await resourcesService.getAvatar({ authCookie, uuid, url: pathWithoutApiPrefix });

    const contentType = response.headers.get('content-type') || 'application/octet-stream';

    res.setHeader('Content-Type', contentType);

    const cacheControl = response.headers.get('cache-control');
    if (cacheControl) {
      res.setHeader('Cache-Control', cacheControl);
    }

    const buffer = await response.arrayBuffer();

    return res.status(response.status).send(Buffer.from(buffer));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const resourcesController = { getAvatar };
