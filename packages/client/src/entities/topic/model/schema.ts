import { z } from 'zod';

export const topicContentSchema = z.object({
  title: z.string(),
  themeDescription: z.string(),
  text: z.string()
});

export const topicSchema = topicContentSchema.extend({
  id: z.number(),
  createdAt: z.string().transform((d) => new Date(d))
});

export const createTopicRequestDtoSchema = z.object({
  author: z.string(),
  title: z.string(),
  themeDescription: z.string(),
  text: z.string()
});

export const updateTopicRequestDtoSchema = z.object({
  topicId: z.number(),
  topic: topicContentSchema.partial()
});
