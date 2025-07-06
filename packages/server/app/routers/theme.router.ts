import { Router } from 'express';
import { getThemes } from '../controllers/theme.controller';

const router = Router();

router.get('/v2/theme', getThemes);

export default router;
