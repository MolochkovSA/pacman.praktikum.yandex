// TODO: add real api

import { DEFAULT_TOPICS_ON_SCREEN } from '../constants';
import { TopicListRequestDto, TopicListResponseDto } from '../model/types';

const mockTopicList = {
  topics: [
    {
      id: 1,
      title: 'Mock topic1',
      author: {
        id: 1,
        display_name: 'Mock author1'
      },
      commentsCount: 7,
      lastComment: {
        author: {
          id: 1,
          display_name: 'Mock commentator1'
        },
        createdAt: '2022-01-01T00:00:00.000Z'
      }
    },
    {
      id: 2,
      title: 'Mock topic2',
      author: {
        id: 2,
        display_name: 'Mock author2'
      },
      commentsCount: 7,
      lastComment: {
        author: {
          id: 2,
          display_name: 'Mock commentator2'
        },
        createdAt: '2022-01-01T00:00:00.000Z'
      }
    }
  ],
  total: 27
};

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
