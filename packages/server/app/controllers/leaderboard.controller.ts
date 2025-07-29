import { Request, Response } from 'express';
import { leaderboardService } from '../services/leaderboard.service';

const fetchLeaderboard = async (req: Request, res: Response) => {
  try {
    const { authCookie, uuid } = req.cookies;

    const urlWithoutQuery = req.originalUrl.split('?')[0];
    const parts = urlWithoutQuery.split('/').filter(Boolean);
    const lastPart = parts[parts.length - 1];

    const response = await leaderboardService.fetchLeaderboard({
      authCookie,
      uuid,
      data: req.body,
      comandName: lastPart
    });
    const data = await response.json();

    return res.status(response.status).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const postPlayerScore = async (req: Request, res: Response) => {
  try {
    const { authCookie, uuid } = req.cookies;

    const response = await leaderboardService.postPlayerScore({
      authCookie,
      uuid,
      data: req.body
    });
    return res.status(response.status).end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const leaderboardController = { fetchLeaderboard, postPlayerScore };
