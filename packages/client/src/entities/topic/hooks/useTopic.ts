import { useState } from 'react';

import { topicApi } from '../api/topicApi';
import { CreateTopicRequestDto, UpdateTopicRequestDto } from '../model/types';

// TODO: add real api

export const useTopic = () => {
  const [isLoading, setIsLoading] = useState(false);

  const createTopic = async (data: CreateTopicRequestDto): Promise<void> => {
    setIsLoading(true);

    try {
      await topicApi.createTopic(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const updateTopic = async (data: UpdateTopicRequestDto): Promise<void> => {
    setIsLoading(true);

    try {
      await topicApi.updateTopic(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, createTopic, updateTopic };
};
