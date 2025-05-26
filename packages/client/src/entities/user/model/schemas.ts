import { z } from 'zod';

export const userSchema = z.object({
  id: z.number(),
  first_name: z
    .string({ required_error: 'Поле обязательно' })
    .min(3, { message: 'Не менее 3 символов' })
    .max(100, { message: 'Не более 100 символов' })
    .regex(/^[A-ZА-Я][a-zа-яA-ZА-Я-]*$/, {
      message: 'Допустимы буквы латиницы или кириллицы, первая буква заглавная, можно использовать дефис'
    }),
  second_name: z
    .string({ required_error: 'Поле обязательно' })
    .min(1, { message: 'Не менее 1 символа' }) // яндекс апи при создании пользователя возвращает 1 символ
    .max(100, { message: 'Не более 100 символов' })
    .regex(/^[A-ZА-Я][a-zа-яA-ZА-Я-]*$/, {
      message: 'Допустимы буквы латиницы или кириллицы, первая буква заглавная, можно использовать дефис'
    }),
  login: z
    .string({ required_error: 'Поле обязательно' })
    .min(3, { message: 'Не менее 3 символов' })
    .max(20, { message: 'Не более 20 символов' })
    .regex(/^(?!\d+$)[a-zA-Z0-9-]+$/, {
      message: 'Допустимы латинские буквы и цифры, не должны быть исключительно одни цифры'
    }),
  email: z
    .string({ required_error: 'Поле обязательно' })
    .email({ message: 'Используйте свой email для ввода' })
    .min(3, { message: 'Не менее 3 символов' })
    .max(100, { message: 'Не более 100 символов' }),
  phone: z
    .string({ required_error: 'Поле обязательно' })
    .min(10, { message: 'Не менее 10 символов' })
    .max(15, { message: 'Не более 15 символов' })
    .regex(/^\+?\d+$/, {
      message: 'Используйте любые цифры, может быть + в начале'
    }),
  avatar: z.string().nullable()
});

export const passwordSchema = z
  .string({ required_error: 'Поле обязательно' })
  .min(8, { message: 'Не менее 8 символов' })
  .max(40, { message: 'Не более 40 символов' })
  .regex(/^(?=.*[A-Z])(?=.*\d).+$/, {
    message: 'Должна быть хотя бы одна цифра и заглавная латинская буква'
  });
