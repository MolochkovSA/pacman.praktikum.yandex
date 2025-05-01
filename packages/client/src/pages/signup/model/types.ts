import { z } from 'zod';

import { signupSchema } from '@/pages/signup/model/scheme';

export type Signup = z.infer<typeof signupSchema>;
