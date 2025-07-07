import { PACMAN_API_URL } from '@/shared/const/api';
import { CreateTopicRequestDto, Topic, TopicId, UpdateTopicRequestDto } from '../model/types';

const createTopic = async (data: CreateTopicRequestDto): Promise<void> => {
  const response = await fetch(`${PACMAN_API_URL}/topic`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  console.log('Topic created:', response);
};
const updateTopic = async (data: UpdateTopicRequestDto): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  console.log('Topic updated:', data);
};

const getTopicByid = async (id: TopicId): Promise<Topic> => {
  const response = await fetch(`${PACMAN_API_URL}/topic?id=${id}`, {
    method: 'GET'
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch topic: ${response.status} ${response.statusText}`);
  }

  const topic: Topic = await response.json();
  return topic;
};

export const topicApi = { createTopic, updateTopic, getTopicByid };
