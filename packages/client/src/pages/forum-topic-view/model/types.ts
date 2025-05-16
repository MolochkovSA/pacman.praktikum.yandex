import { Topic, TopicId } from '@/entities/topic';
import { User } from '@/entities/user';
import { Comment } from '@/entities/comment';

type UserView = Pick<User, 'id' | 'display_name' | 'avatar'>;

export type TopicViewRequestDto = {
  id: TopicId;
  skip: number;
  limit: number;
};

export type CommentView = Comment & {
  author: UserView;
};

export type TopicView = Topic & {
  author: UserView;
};

export type TopicViewResponseDto = {
  topic: TopicView;
  comments: CommentView[];
  total: number;
};
