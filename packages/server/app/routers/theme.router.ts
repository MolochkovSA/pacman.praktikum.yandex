import { Router } from 'express';
import { createTheme, getThemes } from '../controllers/theme.controller';

const router = Router();

router.post('/v2/theme', createTheme);
router.get('/v2/theme', getThemes);

export default router;
