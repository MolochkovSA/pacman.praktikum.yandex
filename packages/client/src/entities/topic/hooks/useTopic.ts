import { useState } from 'react';

import { topicApi } from '../api/topicApi';
import { CreateTopicRequestDto, Topic, TopicId, UpdateTopicRequestDto } from '../model/types';

// TODO: add real api

export const useTopic = () => {
  const [isLoading, setIsLoading] = useState(false);

  const createTopic = async (data: CreateTopicRequestDto): Promise<void> => {
    setIsLoading(true);

    try {
      await topicApi.createTopic(data);
    } finally {
      setIsLoading(false);
    }
  };

  const updateTopic = async (data: UpdateTopicRequestDto): Promise<void> => {
    setIsLoading(true);

    try {
      await topicApi.updateTopic(data);
    } finally {
      setIsLoading(false);
    }
  };

  const getTopicByid = async (id: TopicId): Promise<Topic> => {
    setIsLoading(true);

    try {
      const topicDto = await topicApi.getTopicByid(id);

      return {
        ...topicDto,
        createdAt: new Date(topicDto.createdAt)
      };
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTopic = async (id: TopicId): Promise<void> => {
    setIsLoading(true);

    try {
      await topicApi.deleteTopic(id);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, createTopic, updateTopic, getTopicByid, deleteTopic };
};
