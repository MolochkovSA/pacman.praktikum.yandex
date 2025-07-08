import { PACMAN_API_URL } from '@/shared/const/api';
import { CreateCommentRequestDto } from '../model/types';
import { HttpError } from '@/shared/types/api/HttpError';

const createComment = async (data: CreateCommentRequestDto): Promise<void> => {
  const response = await fetch(`${PACMAN_API_URL}/comment`, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    throw await HttpError.setMessage(response);
  }
};

export const commentApi = { createComment };
