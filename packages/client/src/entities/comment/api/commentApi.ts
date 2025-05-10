import { CreateCommentRequestDto } from '../model/types';

// TODO: add real api

const createComment = async (data: CreateCommentRequestDto): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  console.log('Comment created:', data);
};

export const commentApi = { createComment };
