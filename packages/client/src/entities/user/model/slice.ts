import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from './types';
import { PACMAN_API_URL } from '@/shared/const/api';
import { HttpError } from '@/shared/types';
import { userSchema } from './schemas';

type UserState = {
  user: Nullable<User>;
  fetchStatus: 'succeeded' | 'failed' | 'pending' | 'idle';
};

const initialState: UserState = {
  user: null,
  fetchStatus: 'idle'
};

export const fetchUserThunk = createAsyncThunk('user/fetchUserThunk', async (): Promise<User> => {
  const url = `${PACMAN_API_URL}/auth/user`;

  const response = await fetch(url, {
    credentials: 'include'
  });

  if (!response.ok) {
    throw new HttpError(response.status, response.statusText);
  }

  const data: unknown = await response.json();

  return userSchema.parse(data);
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  selectors: {
    selectUser: (state) => state.user,
    selectStatus: (state) => state.fetchStatus,
    selectFetchStatusIsPending: (state) => state.fetchStatus === 'pending',
    selectFetchStatusIsIdle: (state) => state.fetchStatus === 'idle',
    selectFetchStatusIsSucceeded: (state) => state.fetchStatus === 'succeeded',
    selectFetchStatusIsFailed: (state) => state.fetchStatus === 'failed'
  },
  reducers: {
    clearState: (state) => {
      state.user = null;
      state.fetchStatus = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserThunk.pending, (state) => {
        state.user = null;
        state.fetchStatus = 'pending';
      })
      .addCase(fetchUserThunk.fulfilled, (state, { payload }: PayloadAction<User>) => {
        state.user = payload;
        state.fetchStatus = 'succeeded';
      })
      .addCase(fetchUserThunk.rejected, (state) => {
        state.user = null;
        state.fetchStatus = 'failed';
      });
  }
});

export const { reducer: userReducer, selectors: userSelectors, actions: userActions } = userSlice;
