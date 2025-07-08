import { TopicId } from '@/entities/topic';
import { TopicView } from '../model/types';
import { PACMAN_API_URL } from '@/shared/const/api';
import { topicViewResponseDtoSchema } from '../model/schema';

type Args = {
  id: TopicId;
  signal?: AbortSignal;
};

export const getTopicView = async ({ id, signal }: Args): Promise<TopicView> => {
  const params = new URLSearchParams({
    topicId: String(id)
  });

  const response = await fetch(`${PACMAN_API_URL}/topic/?${params.toString()}`, {
    method: 'GET',
    signal
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch topic view: ${response.status} ${response.statusText}`);
  }

  const json = await response.json();

  const parsed = topicViewResponseDtoSchema.parse({
    id,
    ...json
  });

  return {
    ...parsed,
    createdAt: new Date(parsed.createdAt),
    comments: parsed.comments.map((c) => ({
      ...c,
      createdAt: new Date(c.createdAt)
    }))
  };
};
