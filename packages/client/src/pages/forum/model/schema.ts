import { z } from 'zod';

// lastComment
export const lastCommentSchema = z.object({
  author: z.string(),
  createdAt: z.string().transform((d) => new Date(d))
});

// TopicPreview
export const topicPreviewSchema = z.object({
  id: z.number(),
  title: z.string(),
  author: z.string().optional(),
  amountComments: z.number(),
  lastComment: lastCommentSchema.nullable()
});

// TopicListResponseDto
export const topicListResponseDtoSchema = z.object({
  topics: z.array(topicPreviewSchema),
  total: z.number()
});

// Types
export type LastComment = z.infer<typeof lastCommentSchema>;
export type TopicPreview = z.infer<typeof topicPreviewSchema>;
export type TopicListResponseDto = z.infer<typeof topicListResponseDtoSchema>;
