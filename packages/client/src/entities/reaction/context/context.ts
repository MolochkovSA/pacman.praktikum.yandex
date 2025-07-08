import { createContext } from 'react';

import { Reaction } from '../model/types';

type ReactionContextType = {
  isLoading: boolean;
  reactionsList: Reaction[];
};

export const ReactionContext = createContext<ReactionContextType | null>(null);
