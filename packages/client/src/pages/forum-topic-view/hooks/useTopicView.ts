import { useCallback, useEffect, useRef, useState } from 'react';
import { getTopicView } from '../api/getTopicView';
import { TopicView, CommentView } from '../model/types';

export const useTopicView = (id: number) => {
  const [isLoading, setIsLoading] = useState(false);
  const [topic, setTopic] = useState<TopicView | null>(null);
  const [comments, setComments] = useState<CommentView[]>([]);
  const [total, setTotal] = useState(0);

  const abortRef = useRef<AbortController | null>(null);

  const loadTopicView = useCallback(() => {
    const controller = new AbortController();

    // отменяем предыдущий запрос
    abortRef.current?.abort();
    abortRef.current = controller;

    setIsLoading(true);

    getTopicView({
      id,
      signal: controller.signal
    })
      .then((data) => {
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
        setTotal(mappedTopic.comments.length);
      })
      .catch((e) => {
        if (e.name !== 'AbortError') {
          console.error(e);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      });
  }, [id]);

  useEffect(() => {
    loadTopicView();
    return () => abortRef.current?.abort();
  }, [loadTopicView]);

  return { isLoading, topic, comments, total, loadTopicView };
};
