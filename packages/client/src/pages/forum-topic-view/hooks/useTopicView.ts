import { useEffect, useState } from 'react';

import { TopicId } from '@/entities/topic';
import { CommentView, TopicView } from '../model/types';
import { getTopicView } from '../api/getTopicView';

export const useTopicView = (id: TopicId, page: number) => {
  const [topic, setTopic] = useState<TopicView>();
  const [comments, setComments] = useState<CommentView[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    let isLive = true;

    setIsLoading(true);

    getTopicView({ id, page }).then(({ topic, comments, total }) => {
      if (isLive) {
        setTopic(topic);
        setComments(comments);
        setTotal(total);
        setIsLoading(false);
      }
    });

    return () => {
      isLive = false;
    };
  }, [id, page]);

  return {
    topic,
    comments,
    isLoading,
    total
  };
};
