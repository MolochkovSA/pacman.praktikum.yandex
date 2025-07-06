import { Router } from 'express';
import { createComment } from '../controllers/comment.controller';

const router = Router();

router.post('/v2/comment', createComment);

export default router;
