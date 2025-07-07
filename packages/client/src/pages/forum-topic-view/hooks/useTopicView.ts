import { useCallback, useEffect, useState } from 'react';
import { getTopicView } from '../api/getTopicView';
import { TopicView, CommentView } from '../model/types';

export const useTopicView = (id: number, page: number) => {
  const [isLoading, setIsLoading] = useState(true);
  const [topic, setTopic] = useState<TopicView | null>(null);
  const [comments, setComments] = useState<CommentView[]>([]);
  const [total, setTotal] = useState(0);

  const loadTopicView = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getTopicView({ id, page });

      const mappedTopic: TopicView = {
        id,
        title: data.title,
        themeDescription: data.themeDescription,
        text: data.text,
        createdAt: new Date(data.createdAt),
        author: data.author,

        comments: data.comments.map((c) => ({
          id: c.id,
          text: c.text,
          createdAt: new Date(c.createdAt),
          author: c.author,
          reactions: c.reactions || []
        }))
      };

      setTopic(mappedTopic);
      setComments(mappedTopic.comments);
      setTotal(mappedTopic.comments?.length);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [id, page]);

  useEffect(() => {
    loadTopicView();
  }, [loadTopicView]);

  return { isLoading, topic, comments, total, loadTopicView };
};
