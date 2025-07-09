import { useFetchLeaderboardQuery } from '../api/api';
import { FIELD_NAME } from '../constants';
import { DEFAULT_PLAYERS_ON_SCREEN } from '../constants';

export const usePlayerList = (page: number) => {
  const cursor: number = (page - 1) * DEFAULT_PLAYERS_ON_SCREEN;

  const {
    data: players,
    isLoading,
    isError
  } = useFetchLeaderboardQuery({
    ratingFieldName: FIELD_NAME,
    cursor: cursor,
    limit: DEFAULT_PLAYERS_ON_SCREEN
  });

  return {
    players,
    isLoading,
    isError
  };
};
