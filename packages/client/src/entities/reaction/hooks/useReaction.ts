import { useContext } from 'react';

import { ReactionContext } from '../context/context';

export const useReaction = () => {
  const context = useContext(ReactionContext);

  if (!context) {
    throw new Error('useReactionContext must be used within a ReactionContextProvider');
  }

  return context;
};
