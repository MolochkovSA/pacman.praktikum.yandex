import { z } from 'zod';

export const commentReactionSchema = z.object({
  commentId: z.number(),
  reactionId: z.number(),
  author: z.string()
});

export const commentSchema = z.object({
  id: z.number(),
  text: z.string(),
  createdAt: z.string().transform((d) => new Date(d))
});

export const commentViewSchema = commentSchema.extend({
  author: z.string(),
  reactions: z.array(commentReactionSchema).optional().default([])
});

export const topicSchema = z.object({
  id: z.number(),
  title: z.string(),
  text: z.string(),
  themeDescription: z.string(),
  createdAt: z.string().transform((d) => new Date(d))
});

export const topicViewSchema = topicSchema.extend({
  author: z.string(),
  comments: z.array(commentViewSchema)
});
export const topicViewResponseDtoSchema = topicViewSchema;
