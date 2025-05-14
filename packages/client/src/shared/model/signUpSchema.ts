import { baseSchema } from './baseSchema';

export const signUpSchema = baseSchema.refine((data) => data.password === data.password_two, {
  path: ['password_two'],
  message: 'Пароли должны совпадать'
});
