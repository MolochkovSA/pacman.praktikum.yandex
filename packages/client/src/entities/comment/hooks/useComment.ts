import { useState } from 'react';

import { CreateCommentRequestDto } from '../model/types';
import { commentApi } from '../api/commentApi';

// TODO: add real api

export const useComment = () => {
  const [isLoading, setIsLoading] = useState(false);

  const createComment = async (data: CreateCommentRequestDto): Promise<void> => {
    setIsLoading(true);

    try {
      await commentApi.createComment(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, createComment };
};
