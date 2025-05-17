import { useEffect, useState } from 'react';
import { PlayerPreview } from '../model/types';
import { getPlayerList } from '../api/getPlayerList';

export const usePlayerList = (page: number) => {
  const [players, setPlayers] = useState<PlayerPreview[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    let isLive = true;

    setIsLoading(true);

    getPlayerList(page).then(({ players, total }) => {
      if (isLive) {
        setPlayers(players);
        setTotal(total);
        setIsLoading(false);
      }
    });

    return () => {
      isLive = false;
    };
  }, [page]);

  return {
    players,
    isLoading,
    total
  };
};
