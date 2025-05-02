import { Comment } from '@/entities/comment';
import { User } from '@/entities/user';

export type TopicId = number;

export type Topic = {
  id: TopicId;
  author: User;
  title: string;
  text: string;
  createdAt: Date;
  commentsCount: number;
  lastComment: Comment;
};
