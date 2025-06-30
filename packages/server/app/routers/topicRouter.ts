import { Router } from 'express';
import { getTopic } from '../controllers/topicController';

const router = Router();

router.get('/v2/topic', getTopic); // авторизация уже есть на уровне app.use('/api', ...)

export default router;
