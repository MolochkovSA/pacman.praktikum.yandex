import { Topic, TopicId } from '@/entities/topic';
import { Comment } from '@/entities/comment';

export type TopicPreview = {
  id: TopicId;
  title: Topic['title'];
  author?: string;
  amountComments: number;
  lastComment: {
    author: string;
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
