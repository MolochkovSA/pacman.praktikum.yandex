import { useEffect, useState } from 'react';

import { getTopicList } from '../api/getTopicList';
import { TopicPreview } from '../model/types';

export const useTopicList = (page: number) => {
  const [topics, setTopics] = useState<TopicPreview[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    let isLive = true;

    setIsLoading(true);

    getTopicList(page).then(({ topics, total }) => {
      if (isLive) {
        setTopics(topics);
        setTotal(total);
        setIsLoading(false);
      }
    });

    return () => {
      isLive = false;
    };
  }, [page]);

  return {
    topics,
    isLoading,
    total
  };
};
