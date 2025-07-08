import { z } from 'zod';

// CommentReaction
export const commentReactionSchema = z.object({
  commentId: z.number(),
  reactionId: z.number(),
  author: z.string()
});

// Comment
export const commentSchema = z.object({
  id: z.number(),
  text: z.string(),
  createdAt: z.string().transform((d) => new Date(d))
});

// CommentView
export const commentViewSchema = commentSchema.extend({
  author: z.string(),
  reactions: z.array(commentReactionSchema).optional().default([])
});

// Topic
export const topicSchema = z.object({
  id: z.number(),
  title: z.string(),
  text: z.string(),
  themeDescription: z.string(),
  createdAt: z.string().transform((d) => new Date(d))
});

// TopicView
export const topicViewSchema = topicSchema.extend({
  author: z.string(),
  comments: z.array(commentViewSchema)
});

// TopicViewResponseDto
export const topicViewResponseDtoSchema = z.object({
  topic: topicViewSchema,
  comments: z.array(commentViewSchema),
  total: z.number()
});

// // Types
// export type CommentReaction = z.infer<typeof commentReactionSchema>;
// export type Comment = z.infer<typeof commentSchema>;
// export type CommentView = z.infer<typeof commentViewSchema>;
// export type Topic = z.infer<typeof topicSchema>;
// export type TopicView = z.infer<typeof topicViewSchema>;
// export type TopicViewResponseDto = z.infer<typeof topicViewResponseDtoSchema>;
