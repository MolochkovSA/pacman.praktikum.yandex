import { useEffect, useState } from 'react';

import { Reaction } from '../model/types';
import { getReactionList } from '../api/getReactionList';

export const useReactionsList = () => {
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

  return {
    reactionsList,
    isLoading
  };
};
