import { User } from '@/entities/user';

export type CommentId = number;

export type Comment = {
  id: number;
  author: User;
  text: string;
  createdAt: Date;
};

export type CommentPreview = Omit<Comment, 'text'>;
