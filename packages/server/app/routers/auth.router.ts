import { Router } from 'express';
import { authController } from '../controllers/auth.controller';

const router = Router();

router.get('/v2/auth/user', authController.me);
router.post('/v2/auth/signin/yandex', authController.signInWithYandex);
router.post('/v2/auth/signin', authController.signIn);
router.post('/v2/auth/signup', authController.signUp);
router.post('/v2/auth/logout', authController.logout);

export default router;
