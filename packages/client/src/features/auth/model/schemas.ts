import { string, z } from 'zod';

import { userSchema, passwordSchema } from '@/entities/user';

export const signInSchema = z.object({
  login: userSchema.shape.login,
  password: passwordSchema
});

export const signUpSchema = z
  .object({
    first_name: userSchema.shape.first_name,
    second_name: userSchema.shape.second_name,
    login: userSchema.shape.login,
    email: userSchema.shape.email.trim(),
    phone: userSchema.shape.phone.trim(),
    password: passwordSchema,
    password_two: passwordSchema
  })
  .refine((data) => data.password === data.password_two, {
    path: ['password_two'],
    message: 'Пароли должны совпадать'
  });

export const getServiceIdSchema = z.object({
  service_id: string()
});

export const signUpResponseDtoSchema = userSchema.pick({ id: true });
