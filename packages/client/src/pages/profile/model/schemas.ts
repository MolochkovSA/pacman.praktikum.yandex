import { z } from 'zod';

import { userSchema, passwordSchema } from '@/entities/user';

export const profileSchema = userSchema.pick({
  first_name: true,
  second_name: true,
  login: true,
  email: true,
  phone: true
});

export const changePasswordSchema = z
  .object({
    oldPassword: passwordSchema,
    newPassword: passwordSchema,
    repeated_password: z.string({ required_error: 'Поле обязательно' })
  })
  .refine((data) => data.newPassword === data.repeated_password, {
    path: ['repeated_password'],
    message: 'Пароли должны совпадать'
  });

export const changeAvatarSchema = z.object({
  avatar: z
    .any()
    .refine((files) => files?.length === 1, 'Загрузите одно изображение')
    .refine((files) => files?.[0]?.type?.startsWith('image/'), 'Только изображения')
});
