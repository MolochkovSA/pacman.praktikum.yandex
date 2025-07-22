import { noHtmlTags } from '@/shared/lib/validation/validationUtils';
import { z } from 'zod';

export const commentSchema = z.object({
  text: z
    .string()
    .trim()
    .min(1, 'Комментарий не может быть пустым')
    .max(500, 'Комментарий не должен превышать 500 символов')
    .refine(noHtmlTags, { message: 'HTML-теги недопустимы' })
});
