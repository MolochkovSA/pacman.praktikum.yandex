// TODO: add real api

import { DEFAULT_TOPICS_ON_SCREEN } from '../constants';
import { TopicListRequestDto, TopicListResponseDto } from '../model/types';
import { mockTopicList } from './mockData';

export const getTopicList = async (page: number): Promise<TopicListResponseDto> => {
  const skip: number = (page - 1) * DEFAULT_TOPICS_ON_SCREEN;
  const data: TopicListRequestDto = { skip, limit: DEFAULT_TOPICS_ON_SCREEN };

  console.log('Loading topics...', data);

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return {
    ...mockTopicList,
    topics: mockTopicList.topics.map((topic) => ({
      ...topic,
      lastComment: { ...topic.lastComment, createdAt: new Date(topic.lastComment.createdAt) }
    }))
  };
};
