import { z } from 'zod';

import { signInSchema, signUpSchema, signUpResponseDtoSchema } from './schemas';

export type SignInDto = z.infer<typeof signInSchema>;

export type SignUpRequestDto = Omit<z.infer<typeof signUpSchema>, 'password_two'>;

export type SignUpResponseDto = z.infer<typeof signUpResponseDtoSchema>;
