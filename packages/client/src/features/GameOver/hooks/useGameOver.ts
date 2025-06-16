import { usePostPlayerScoreQuery } from '@/pages/leader-board/api/api';
import { useAppSelector } from '@/shared/model/redux';
import { FIELD_NAME, TEAM_NAME } from '@/pages/leader-board/constants';
import { userSelectors } from '@/entities/user';

type Props = {
  seconds: number;
  score: number;
};
export const useGameOver = ({ score, seconds }: Props) => {
  const user = useAppSelector(userSelectors.selectUser);

  const { data, isError } = usePostPlayerScoreQuery({
    data: {
      id: user!.id,
      login: user!.login,
      pacman_score: score,
      time: seconds
    },
    ratingFieldName: FIELD_NAME,
    teamName: TEAM_NAME
  });

  return {
    data,
    isError
  };
};
