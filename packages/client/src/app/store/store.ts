import { configureStore } from '@reduxjs/toolkit';

import { notificationReducer } from '@/entities/notification';
import { userReducer } from '@/entities/user';

export const store = configureStore({
  reducer: {
    user: userReducer,
    notification: notificationReducer
  }
});

export type AllStateType = ReturnType<typeof store.getState>;
