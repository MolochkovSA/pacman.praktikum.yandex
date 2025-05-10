import { z } from 'zod';

import { loginSchema } from './loginSchema';
import { profileSchema } from './profileSchema';
import { signUpSchema } from './signUpSchema';
import { passwordSchema } from './passwordSchema';

export type Profile = z.infer<typeof profileSchema>;
export type Password = z.infer<typeof passwordSchema>;
export type Login = z.infer<typeof loginSchema>;
export type Signup = z.infer<typeof signUpSchema>;
