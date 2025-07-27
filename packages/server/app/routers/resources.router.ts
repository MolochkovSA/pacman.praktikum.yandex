import { Router } from 'express';
import { resourcesController } from '../controllers/resources.controller';

const router = Router();

router.get('/v2/resources/*', resourcesController.getAvatar);

export default router;
