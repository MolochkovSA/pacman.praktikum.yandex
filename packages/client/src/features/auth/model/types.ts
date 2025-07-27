import { z } from 'zod';

import { signInSchema, signUpSchema, signUpResponseDtoSchema, getServiceIdSchema } from './schemas';

export type SignInDto = z.infer<typeof signInSchema>;

export type SignUpRequestDto = Omit<z.infer<typeof signUpSchema>, 'password_two'>;

export type SignUpResponseDto = z.infer<typeof signUpResponseDtoSchema>;

export type ServiceId = z.infer<typeof getServiceIdSchema>;

export type OAuthYandexRequestDto = {
  code: string;
  redirect_uri: string;
};
