import { z } from 'zod';

import { reactionSchema } from './schemas';

export type Reaction = z.infer<typeof reactionSchema>;
export type ReactionId = Reaction['id'];
