import { TopicId } from '@/entities/topic';
import { DEFAULT_COMMENTS_ON_SCREEN } from '../constants';
import { TopicViewRequestDto, TopicViewResponseDto } from '../model/types';
import { getMockTopicVew } from './mockData';

import defaultAvatar from '@/assets/images/avatar.png';

type Args = {
  id: TopicId;
  page: number;
};

export const getTopicView = async ({ id, page }: Args): Promise<TopicViewResponseDto> => {
  const skip: number = (page - 1) * DEFAULT_COMMENTS_ON_SCREEN;
  const data: TopicViewRequestDto = { id, skip, limit: DEFAULT_COMMENTS_ON_SCREEN };

  console.log('Loading topics...', data);

  await new Promise((resolve) => setTimeout(resolve, 2000));

  const { topic, comments, total } = getMockTopicVew(data);

  const mappedTopic = {
    ...topic,
    createdAt: new Date(topic.createdAt),
    author: { ...topic.author, avatar: topic.author.avatar || defaultAvatar }
  };

  const mappedComments = comments.map((comment) => ({
    ...comment,
    createdAt: new Date(comment.createdAt),
    author: { ...comment.author, avatar: comment.author.avatar || defaultAvatar }
  }));

  return {
    topic: mappedTopic,
    comments: mappedComments,
    total
  };
};
