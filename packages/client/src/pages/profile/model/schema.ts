import { z } from 'zod';

export const profileSchema = z
  .object({
    first_name: z
      .string({ required_error: 'Имя не может быть пустым.' })
      .min(1, { message: 'Имя не может быть пустым.' })
      .regex(/^[А-ЯЁA-Z]/, {
        message: 'Имя должно начинаться с заглавной буквы.'
      })
      .regex(/^[А-ЯЁA-Zа-яёa-z-]+$/, {
        message: 'Имя может содержать только буквы и дефис.'
      })
      .refine((val) => !/\d/.test(val), {
        message: 'Имя не должно содержать цифры.'
      })
      .refine((val) => !/\s/.test(val), {
        message: 'Имя не должно содержать пробелы.'
      }),
    second_name: z
      .string({ required_error: 'Фамилия не может быть пустой.' })
      .min(1, { message: 'Фамилия не может быть пустой.' })
      .regex(/^[А-ЯЁA-Z]/, {
        message: 'Фамилия должна начинаться с заглавной буквы.'
      })
      .regex(/^[А-ЯЁA-Zа-яёa-z-]+$/, {
        message: 'Фамилия может содержать только буквы и дефис.'
      })
      .refine((val) => !/\d/.test(val), {
        message: 'Фамилия не должна содержать цифры.'
      })
      .refine((val) => !/\s/.test(val), {
        message: 'Фамилия не должна содержать пробелы.'
      }),

    login: z
      .string({ required_error: 'Логин не может быть пустым.' })
      .min(3, { message: 'Логин должен быть больше 3 символов.' })
      .max(20, { message: 'Логин должен быть меньше 20 символов.' })
      .regex(/^[a-zA-Z0-9_-]+$/, {
        message: 'Логин может содержать только латиницу, цифры, дефис и нижнее подчёркивание.'
      })
      .refine((val) => !/^\d+$/.test(val), {
        message: 'Логин не может состоять только из цифр.'
      })
      .refine((val) => !/\s/.test(val), {
        message: 'Логин не должен содержать пробелы.'
      }),

    email: z
      .string({ required_error: 'Email не может быть пустым.' })
      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
        message: 'Email должен быть в формате example@example.com.'
      })
      .regex(/[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/, {
        message: 'Перед точкой в email должны быть буквы.'
      }),

    password: z
      .string({ required_error: 'Пароль не может быть пустым.' })
      .min(8, { message: 'Пароль должен быть от 8 символов.' })
      .max(40, { message: 'Пароль должен быть до 40 символов.' })
      .regex(/[A-ZА-ЯЁ]/, {
        message: 'Пароль должен содержать хотя бы одну заглавную букву.'
      })
      .regex(/\d/, {
        message: 'Пароль должен содержать хотя бы одну цифру.'
      }),

    repeated_password: z.string({ required_error: 'Поле обязательно' }),

    phone: z.string().regex(/^\+7\d{10}$/, 'Телефон должен начинаться с +7 и содержать ровно 11 цифр')
  })
  .refine((data) => data.repeated_password === data.password, {
    path: ['repeated_password'],
    message: 'Пароли не совпадают'
  });
