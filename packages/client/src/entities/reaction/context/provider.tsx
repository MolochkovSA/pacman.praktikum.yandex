import { useEffect, useState, PropsWithChildren, useMemo } from 'react';

import { ReactionContext } from './context';
import { Reaction } from '../model/types';
import { getReactionList } from '../api/getReactionList';

export const ReactionProvider = ({ children }: PropsWithChildren) => {
  const [reactionsList, setReactionsList] = useState<Reaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    let isLive = true;

    setIsLoading(true);

    getReactionList().then((reactionsList) => {
      if (isLive) {
        setReactionsList(reactionsList);
        setIsLoading(false);
      }
    });

    return () => {
      isLive = false;
    };
  }, []);

  const values = useMemo(
    () => ({
      reactionsList,
      isLoading
    }),
    [reactionsList, isLoading]
  );

  return <ReactionContext.Provider value={values}>{children}</ReactionContext.Provider>;
};
