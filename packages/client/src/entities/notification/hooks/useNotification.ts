import { useDispatch } from 'react-redux';
import { notify as notifyAction } from '../model/notificationSlice';
import { useCallback } from 'react';

export const useNotification = () => {
  const dispatch = useDispatch();

  const notify = useCallback(
    (message: string) => {
      dispatch(notifyAction(message));
    },
    [dispatch]
  );

  return { notify };
};
