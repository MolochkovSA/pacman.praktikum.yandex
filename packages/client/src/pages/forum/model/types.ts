import { Topic, TopicId } from '@/entities/topic';
import { User } from '@/entities/user';
import { Comment } from '@/entities/comment';

type UserPreview = Pick<User, 'id' | 'login'>;

export type TopicPreview = {
  id: TopicId;
  title: Topic['title'];
  author: UserPreview;
  commentsCount: number;
  lastComment: {
    author: UserPreview;
    createdAt: Comment['createdAt'];
  };
};

export type TopicListResponseDto = {
  topics: TopicPreview[];
  total: number;
};

export type TopicListRequestDto = {
  skip: number;
  limit: number;
};
