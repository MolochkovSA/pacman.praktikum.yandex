import { z } from 'zod';

import { topicSchema } from './schema';

export type NewTopicType = z.infer<typeof topicSchema>;
