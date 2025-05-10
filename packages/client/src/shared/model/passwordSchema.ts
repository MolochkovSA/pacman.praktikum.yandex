import { baseSchema } from './baseSchema';

export const passwordSchema = baseSchema
  .pick({
    password: true,
    password_two: true
  })
  .refine((data) => data.password === data.password_two, {
    path: ['password_two'],
    message: 'Пароли должны совпадать'
  });
