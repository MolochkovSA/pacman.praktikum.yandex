import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type NotificationState = {
  messages: string[];
};

const initialState: NotificationState = {
  messages: []
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  selectors: {
    selectNotifications: (state) => state.messages
  },
  reducers: {
    deleteLastMessage: (state) => {
      state.messages = state.messages.slice(0, -1);
    },
    notify: (state, action: PayloadAction<string>) => {
      state.messages = [...state.messages, action.payload];
    }
  }
});

export const { deleteLastMessage, notify } = notificationSlice.actions;

export const { selectNotifications } = notificationSlice.selectors;

export default notificationSlice.reducer;
