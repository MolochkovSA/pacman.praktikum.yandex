import { Router } from 'express';
import { authController } from '../controllers/auth.controller';

const router = Router();

router.post('/v2/auth/signin', authController.signIn);

export default router;
