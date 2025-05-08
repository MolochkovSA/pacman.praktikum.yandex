import { Comment, CommentPreview } from '@/entities/comment';
import { User } from '@/entities/user';

export type TopicId = number;

export type Topic = {
  id: TopicId;
  author: User;
  title: string;
  themeDescription: string;
  text: string;
  createdAt: Date;
  comments: Comment[];
};

export type TopicPreview = Pick<Topic, 'id' | 'author' | 'title'> & {
  lastComment: CommentPreview;
  commentsCount: number;
};
export type TopicView = Topic & { comments: Comment[] };
