import { Router } from 'express';
import { leaderboardController } from '../controllers/leaderboard.controller';

const router = Router();

router.post('/v2/leaderboard', leaderboardController.postPlayerScore);
router.post('/v2/leaderboard/*', leaderboardController.fetchLeaderboard);

export default router;
