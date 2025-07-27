import { API_PATH } from '@/shared/const/api';
import { CreateTopicRequestDto, Topic, TopicId, UpdateTopicRequestDto } from '../model/types';
import { topicSchema } from '../model/schema';

const createTopic = async (data: CreateTopicRequestDto): Promise<void> => {
  const response = await fetch(`${API_PATH}/topic`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch topic: ${response.status} ${response.statusText}`);
  }
};
const updateTopic = async (data: UpdateTopicRequestDto): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  console.log('Topic updated:', data);
};

const getTopicByid = async (id: TopicId): Promise<Topic> => {
  const response = await fetch(`${API_PATH}/topic?id=${id}`, {
    method: 'GET'
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch topic: ${response.status} ${response.statusText}`);
  }
  const json = await response.json();

  const topic = topicSchema.parse(json);

  return topic;
};

export const topicApi = { createTopic, updateTopic, getTopicByid };
