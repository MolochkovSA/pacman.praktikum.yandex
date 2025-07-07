import { Router } from 'express';
import { addReactionByComment, deleteReactionByComment, getAllReaction } from '../controllers/reaction.controller';

const router = Router();

router.get('/v2/reactions', getAllReaction);
router.post('/v2/reaction', addReactionByComment);
router.delete('/v2/reaction', deleteReactionByComment);

export default router;
