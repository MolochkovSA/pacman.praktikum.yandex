import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@/entities/user/model/slice.ts';
import notificationReducer from '@/shared/model/notificationSlice.ts';

export const store = configureStore({
  reducer: {
    user: userReducer,
    notification: notificationReducer
  }
});

export type AllStateType = ReturnType<typeof store.getState>;
