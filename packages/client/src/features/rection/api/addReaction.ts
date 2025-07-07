import { PACMAN_API_URL } from '@/shared/const/api';
import { CommentReaction } from '../model/types';

export const addReaction = async (commentReaction: CommentReaction): Promise<void> => {
  const res = await fetch(`${PACMAN_API_URL}/reaction`, {
    method: 'POST',
    body: JSON.stringify(commentReaction),
    headers: { 'Content-Type': 'application/json;charset=utf-8' }
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }
};
