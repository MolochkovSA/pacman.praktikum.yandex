import { User } from '@/entities/user';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

type Nullable<T> = T | null;

type UserState = {
  item: Nullable<User>;
  fetchStatus: 'succeeded' | 'failed' | 'pending' | 'idle';
};

const initialState: UserState = {
  item: null,
  fetchStatus: 'idle'
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  selectors: {
    selectUser: (state) => state.item,
    selectStatus: (state) => state.fetchStatus,
    selectFetchStatusIsPending: (state) => state.fetchStatus === 'pending',
    selectFetchStatusIsIdle: (state) => state.fetchStatus === 'idle',
    selectFetchStatusIsSucceeded: (state) => state.fetchStatus === 'succeeded',
    selectFetchStatusIsFailed: (state) => state.fetchStatus === 'failed',
    selectUserByStatus: createSelector(
      (state: UserState) => state.item,
      (state: UserState) => state.fetchStatus,
      (item, fetchStatus) => {
        if (fetchStatus !== 'failed') return item;
        return null;
      }
    )
  },
  reducers: {
    setUser: (state, action: PayloadAction<Nullable<User>>) => {
      state.item = action.payload;
    },
    setPendingStatus: (state) => {
      state.fetchStatus = 'pending';
    },
    setIdleStatus: (state) => {
      state.fetchStatus = 'idle';
    },
    setSucceededStatus: (state, action: PayloadAction<Nullable<User>>) => {
      state.item = action.payload;
      state.fetchStatus = 'succeeded';
    },
    setFailedStatus: (state) => {
      state.item = null;
      state.fetchStatus = 'failed';
    }
  }
});

export const { setUser, setFailedStatus, setSucceededStatus, setPendingStatus, setIdleStatus } = userSlice.actions;

export const {
  selectUser,
  selectFetchStatusIsFailed,
  selectFetchStatusIsIdle,
  selectFetchStatusIsPending,
  selectFetchStatusIsSucceeded,
  selectUserByStatus,
  selectStatus
} = userSlice.selectors;

export default userSlice.reducer;
