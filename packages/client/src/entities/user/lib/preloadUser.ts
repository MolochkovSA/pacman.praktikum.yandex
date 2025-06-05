import { PageInitArgs } from '@/shared/types';
import { fetchUserThunk, userSelectors } from '../model/slice';

export const preloadUser = async ({ dispatch, state, ctx }: PageInitArgs) => {
  if (!userSelectors.selectUser(state)) {
    dispatch(fetchUserThunk(ctx.clientToken));
  }

  return null;
};
