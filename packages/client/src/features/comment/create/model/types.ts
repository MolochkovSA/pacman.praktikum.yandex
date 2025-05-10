import { z } from 'zod';

import { commentSchema } from './schema';

export type CommentData = z.infer<typeof commentSchema>;
