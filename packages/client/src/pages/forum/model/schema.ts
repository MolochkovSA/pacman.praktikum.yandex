import { z } from 'zod';

export const lastCommentSchema = z.object({
  author: z.string(),
  createdAt: z.string().transform((d) => new Date(d))
});

export const topicPreviewSchema = z.object({
  id: z.number(),
  title: z.string(),
  author: z.string().optional(),
  amountComments: z.number(),
  lastComment: lastCommentSchema.nullable()
});

export const topicListResponseDtoSchema = z.array(topicPreviewSchema);
