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

  const parsed = topicViewResponseDtoSchema.parse(json);

  return parsed.topic;

  // const mappedTopic: TopicView = {
  //   ...json,
  //   createdAt: new Date(json.createdAt),
  //   author: String(json.author),
  //   comments: json.comments.map((c: CommentView) => ({
  //     id: c.id,
  //     text: c.text,
  //     createdAt: new Date(c.createdAt),
  //     author: String(c.author),
  //     reactions: c.reactions || []
  //   }))
  // };
  // return mappedTopic;
};
