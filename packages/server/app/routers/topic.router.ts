import { Router } from 'express';
import { createTopic, getTopicById, getTopicsByAmountAndPage } from '../controllers/topic.controller';

const router = Router();

router.get('/v2/topic/list', getTopicsByAmountAndPage);
router.get('/v2/topic', getTopicById);
router.post('/v2/topic', createTopic);

export default router;
