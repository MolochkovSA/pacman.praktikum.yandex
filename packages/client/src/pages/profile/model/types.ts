import z from 'zod';

import { profileSchema, changePasswordSchema, changeAvatarSchema } from './schemas';

export type Profile = z.infer<typeof profileSchema>;

export type ChangePasswordType = z.infer<typeof changePasswordSchema>;

export type PasswordRequestDto = Omit<ChangePasswordType, 'repeated_password'>;

export type ChangeAvatarType = z.infer<typeof changeAvatarSchema>;
