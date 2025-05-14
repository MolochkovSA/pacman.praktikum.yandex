import { CreateTopicRequestDto, Topic, TopicId, UpdateTopicRequestDto } from '../model/types';

// TODO: add real api

const mockTopic = {
  id: 1,
  title: 'Mock topic',
  themeDescription: 'Mock description',
  text: 'Mock text',
  createdAt: '2022-01-01T00:00:00.000Z'
};

const createTopic = async (data: CreateTopicRequestDto): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  console.log('Topic created:', data);
};

const updateTopic = async (data: UpdateTopicRequestDto): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  console.log('Topic updated:', data);
};

const getTopicByid = async (id: TopicId): Promise<Topic> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const topic = {
    ...mockTopic,
    id,
    createdAt: new Date(mockTopic.createdAt)
  };
  console.log('Topic:', topic);

  return topic;
};

export const topicApi = { createTopic, updateTopic, getTopicByid };
