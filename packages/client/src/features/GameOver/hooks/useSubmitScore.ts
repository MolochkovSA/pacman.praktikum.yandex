import { usePostPlayerScoreMutation } from '@/pages/leader-board/api/api';
import { useAppSelector } from '@/shared/model/redux';
import { FIELD_NAME, TEAM_NAME } from '@/pages/leader-board/constants';
import { userSelectors } from '@/entities/user';
import { useCallback } from 'react';

type Props = {
  seconds: number;
  score: number;
};
export const useSubmitScore = () => {
  const user = useAppSelector(userSelectors.selectUser);

  const [submitScoreMutation, result] = usePostPlayerScoreMutation();

  const handleSubmit = useCallback(
    async ({ score, seconds }: Props) => {
      if (!user) return;

      await submitScoreMutation({
        data: {
          id: user.id,
          login: user.login,
          pacman_score: score,
          time: seconds
        },
        ratingFieldName: FIELD_NAME,
        teamName: TEAM_NAME
      });
    },
    [user, submitScoreMutation]
  );

  return {
    result,
    submitScore: handleSubmit
  };
};
