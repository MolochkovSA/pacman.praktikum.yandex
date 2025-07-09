import { PACMAN_API_URL } from '@/shared/const/api';
import { DEFAULT_TOPICS_ON_SCREEN } from '../constants';
import { TopicListRequestDto, TopicPreview } from '../model/types';
import { topicListResponseDtoSchema } from '../model/schema';

export const getTopicList = async (page: number): Promise<TopicPreview[]> => {
  const data: TopicListRequestDto = {
    page: String(page),
    amount: String(DEFAULT_TOPICS_ON_SCREEN)
  };
  const params = new URLSearchParams(data).toString();

  const response = await fetch(`${PACMAN_API_URL}/topic/list?${params}`, {
    method: 'GET'
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch topics: ${response.status} ${response.statusText}`);
  }

  const json = await response.json();
  const parsed = topicListResponseDtoSchema.parse(json);

  return parsed.map((topic) => ({
    ...topic,
    lastComment: topic.lastComment
      ? {
          ...topic.lastComment,
          createdAt: new Date(topic.lastComment.createdAt)
        }
      : null
  }));
};
