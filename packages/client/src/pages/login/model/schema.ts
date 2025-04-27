import { z } from 'zod';

export const loginSchema = z.object({
  login: z
    .string()
    .min(3, { message: 'Не менее 3 символов!!!' })
    .max(20, { message: 'Не более 20 символов!!!' })
    .regex(/^(?!\d+$)[a-zA-Z0-9]+$/, {
      message: 'Допустимы латинские буквы и цифры, не должны быть исключительно одни цифры'
    }),
  password: z
    .string()
    .min(8, { message: 'Не менее 8 символов' })
    .max(40, { message: 'Не более 40 символов' })
    .regex(/^(?=.*[A-Z])(?=.*\d).+$/, {
      message: 'Должна быть хотя бы одна цифра и заглавная латинская буква, не менее 8 символов'
    })
});
