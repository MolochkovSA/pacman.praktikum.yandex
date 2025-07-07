import { Topic, TopicId } from '@/entities/topic';
// import { User } from '@/entities/user';
import { Comment } from '@/entities/comment';
import { CommentReaction } from '@/features/rection';

// type UserView = Pick<User, 'id' | 'login' | 'avatar'>;

export type TopicViewRequestDto = {
  id: TopicId;
  skip: number;
  limit: number;
};

export type CommentView = Comment & {
  author: string;
  reactions: CommentReaction[];
  // "replies": [],
};

export type TopicView = Topic & {
  author: string;
  comments: CommentView[];
};

export type TopicViewResponseDto = {
  topic: TopicView;
  comments: CommentView[];
  total: number;
};

export type MessageType = 'topic' | 'comment' | 'reply';
