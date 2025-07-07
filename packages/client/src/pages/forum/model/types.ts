import { Topic, TopicId } from '@/entities/topic';
import { User } from '@/entities/user';
import { Comment } from '@/entities/comment';

type UserPreview = Pick<User, 'id' | 'login'>;

export type TopicPreview = {
  id: TopicId;
  title: Topic['title'];
  author?: UserPreview;
  amountComments: number;
  lastComment: {
    author: UserPreview;
    createdAt: Comment['createdAt'];
  } | null;
};

export type TopicListResponseDto = {
  topics: TopicPreview[];
  total: number;
};

export type TopicListRequestDto = {
  amount: string;
  page: string;
};
