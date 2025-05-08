import { z } from 'zod';

export const topicSchema = z.object({
  title: z
    .string({
      required_error: 'Поле обязательно'
    })
    .min(3, { message: 'Не менее 3 символов' })
    .max(100, { message: 'Не более 100 символов' }),
  themeDescription: z
    .string({
      required_error: 'Поле обязательно'
    })
    .min(3, { message: 'Не менее 3 символов' })
    .max(200, { message: 'Не более 200 символов' }),
  text: z
    .string({
      required_error: 'Поле обязательно'
    })
    .min(3, { message: 'Не менее 3 символов' })
});
