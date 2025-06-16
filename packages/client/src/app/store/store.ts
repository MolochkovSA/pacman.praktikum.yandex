import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { notificationReducer } from '@/entities/notification';
import { userReducer } from '@/entities/user';

export const reducer = combineReducers({
  user: userReducer,
  notification: notificationReducer
});

declare global {
  interface Window {
    APP_INITIAL_STATE: ReturnType<typeof reducer>;
  }
}

export const store = configureStore({
  reducer,
  preloadedState: typeof window === 'undefined' ? undefined : window.APP_INITIAL_STATE
});
