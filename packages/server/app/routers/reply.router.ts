import { Router } from 'express';
import { createReply } from '../controllers/reply.controller';

const router = Router();

router.post('/v2/reply', createReply);

export default router;
