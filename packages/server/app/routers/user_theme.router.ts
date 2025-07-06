import { Router } from 'express';
import { setUserTheme, getUserTheme } from '../controllers/user_theme.controller';

const router = Router();

router.post('/v2/user/theme', setUserTheme);
router.get('/v2/user/theme/:externalUserId', getUserTheme);

export default router;
