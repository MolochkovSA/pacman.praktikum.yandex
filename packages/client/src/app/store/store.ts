import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { notificationReducer } from '@/entities/notification';
import { userReducer } from '@/entities/user';
import { leaderboardApi } from '@/pages/leader-board/api/api';

export const reducer = combineReducers({
  user: userReducer,
  notification: notificationReducer,
  [leaderboardApi.reducerPath]: leaderboardApi.reducer
});

declare global {
  interface Window {
    APP_INITIAL_STATE: ReturnType<typeof reducer>;
  }
}

export const store = configureStore({
  reducer,
  preloadedState: typeof window === 'undefined' ? undefined : window.APP_INITIAL_STATE,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(leaderboardApi.middleware)
});
