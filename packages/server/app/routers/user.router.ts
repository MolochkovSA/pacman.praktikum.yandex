import { Router } from 'express';
import multer from 'multer';
import { userController } from '../controllers/user.controller';

const router = Router();
const upload = multer();

router.post('/v2/user/theme', userController.setUserTheme);
router.get('/v2/user/theme/:externalUserId', userController.getUserTheme);
router.put('/v2/user/profile', userController.updateProfile);
router.put('/v2/user/password', userController.changePassword);
// @ts-ignore
router.put('/v2/user/profile/avatar', upload.single('avatar'), userController.updateAvatar);

export default router;
