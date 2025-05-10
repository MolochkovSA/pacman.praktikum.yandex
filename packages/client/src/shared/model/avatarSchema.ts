import { z } from 'zod';

export const avatarSchema = z.object({
  avatar: z
    .any()
    .refine((files) => files?.length === 1, 'Загрузите одно изображение')
    .refine((files) => files?.[0]?.type?.startsWith('image/'), 'Только изображения')
});
