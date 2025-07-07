import { TopicId } from '@/entities/topic';
import { CommentView, TopicView } from '../model/types';
import { PACMAN_API_URL } from '@/shared/const/api';

type Args = {
  id: TopicId;
};
export const getTopicView = async ({ id }: Args): Promise<TopicView> => {
  const params = new URLSearchParams({
    topicId: String(id)
  });

  const response = await fetch(`${PACMAN_API_URL}/topic/?${params.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch topic view: ${response.status} ${response.statusText}`);
  }

  const json = await response.json();

  const mappedTopic: TopicView = {
    ...json,
    createdAt: new Date(json.createdAt),
    author: String(json.author),
    comments: json.comments.map((c: CommentView) => ({
      id: c.id,
      text: c.text,
      createdAt: new Date(c.createdAt),
      author: String(c.author),
      reactions: c.reactions || []
    }))
  };
  return mappedTopic;
};
