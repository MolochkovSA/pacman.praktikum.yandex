import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from './types';

type UserState = {
  user: Nullable<User>;
  fetchStatus: 'succeeded' | 'failed' | 'pending' | 'idle';
};

const initialState: UserState = {
  user: null,
  fetchStatus: 'idle'
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  selectors: {
    selectUser: (state) => state.user,
    selectStatus: (state) => state.fetchStatus,
    selectFetchStatusIsPending: (state) => state.fetchStatus === 'pending',
    selectFetchStatusIsIdle: (state) => state.fetchStatus === 'idle',
    selectFetchStatusIsSucceeded: (state) => state.fetchStatus === 'succeeded',
    selectFetchStatusIsFailed: (state) => state.fetchStatus === 'failed',
    selectUserByStatus: createSelector(
      (state: UserState) => state.user,
      (state: UserState) => state.fetchStatus,
      (item, fetchStatus) => {
        if (fetchStatus !== 'failed') return item;
        return null;
      }
    )
  },
  reducers: {
    setUser: (state, action: PayloadAction<Nullable<User>>) => {
      state.user = action.payload;
    },
    setPendingStatus: (state) => {
      state.fetchStatus = 'pending';
    },
    setIdleStatus: (state) => {
      state.fetchStatus = 'idle';
    },
    setSucceededStatus: (state) => {
      state.fetchStatus = 'succeeded';
    },
    setFailedStatus: (state) => {
      state.user = null;
      state.fetchStatus = 'failed';
    }
  }
});

export const { reducer: userReducer, selectors: userSelectors, actions: userActions } = userSlice;
