import { z } from 'zod';

import { topicSchema } from './schema';

export type TopicData = z.infer<typeof topicSchema>;
