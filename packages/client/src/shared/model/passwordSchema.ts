import z from 'zod';

export const passwordSchema = z
  .object({
    oldPassword: z
      .string({ required_error: 'Поле обязательно' })
      .min(8, { message: 'Не менее 8 символов' })
      .max(40, { message: 'Не более 40 символов' })
      .regex(/^(?=.*[A-Z])(?=.*\d).+$/, {
        message: 'Должна быть хотя бы одна цифра и заглавная латинская буква'
      }),
    newPassword: z.string({ required_error: 'Поле обязательно' })
  })
  .refine((data) => data.oldPassword === data.newPassword, {
    path: ['oldPassword'],
    message: 'Пароли должны совпадать'
  });
