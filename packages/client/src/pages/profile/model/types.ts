import { z } from 'zod';

import { profileSchema } from './schema';

export type Profile = z.infer<typeof profileSchema>;
