import { AppDispatch, AppState } from '@/shared/model/redux';
import { fetchUserThunk, userSelectors } from '../model/slice';

type Args = {
  dispatch: AppDispatch;
  getState: () => AppState;
};

export const preloadUser = async ({ dispatch, getState }: Args) => {
  console.log('preloadUser');

  if (!userSelectors.selectUser(getState())) {
    dispatch(fetchUserThunk());
  }

  return null;
};
