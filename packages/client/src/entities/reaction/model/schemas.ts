import { z } from 'zod';

export const reactionSchema = z.object({ id: z.number(), emoji: z.string() });
