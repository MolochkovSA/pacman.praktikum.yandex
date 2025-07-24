import { noHtmlTags } from '@/shared/lib/validation/validationUtils';
import { z } from 'zod';

export const topicSchema = z.object({
  title: z
    .string({
      required_error: 'Поле обязательно'
    })
    .min(3, { message: 'Не менее 3 символов' })
    .max(100, { message: 'Не более 100 символов' })
    .refine(noHtmlTags, {
      message: 'HTML-теги недопустимы в названии'
    }),
  themeDescription: z
    .string({
      required_error: 'Поле обязательно'
    })
    .min(3, { message: 'Не менее 3 символов' })
    .max(200, { message: 'Не более 200 символов' })
    .refine(noHtmlTags, {
      message: 'HTML-теги недопустимы в описании темы'
    }),
  text: z
    .string({
      required_error: 'Поле обязательно'
    })
    .min(3, { message: 'Не менее 3 символов' })
    .refine(noHtmlTags, {
      message: 'HTML-теги недопустимы в тексте'
    })
});
