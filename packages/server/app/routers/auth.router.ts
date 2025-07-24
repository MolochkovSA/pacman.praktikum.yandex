import { Router } from 'express';
import { authController } from '../controllers/auth.controller';

const router = Router();

router.post('/v2/auth/signin', authController.signIn);
router.post('/v2/auth/logout', authController.logout);

export default router;
