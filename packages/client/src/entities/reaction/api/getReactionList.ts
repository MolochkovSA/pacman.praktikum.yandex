import { PACMAN_API_URL } from '@/shared/const/api';
import { reactionSchema } from '../model/schemas';
import { Reaction } from '../model/types';

export const getReactionList = async (): Promise<Reaction[]> => {
  try {
    const res = await fetch(`${PACMAN_API_URL}/reactions`);
    const data: unknown = await res.json();

    return reactionSchema.array().parse(data);
  } catch (error) {
    console.error(error);
    return [];
  }
};
