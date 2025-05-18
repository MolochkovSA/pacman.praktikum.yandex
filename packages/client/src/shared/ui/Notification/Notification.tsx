import React, { useEffect } from 'react';
import styles from './Notification.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { deleteLastMessage, selectNotifications } from '@/shared/model/notificationSlice.ts';

interface Props {
  children?: React.ReactNode;
}

export const Notification: React.FC<Props> = ({ children }) => {
  const dispatch = useDispatch();
  const notification = useSelector(selectNotifications);

  useEffect(() => {
    if (notification.length > 0) {
      setTimeout(() => {
        dispatch(deleteLastMessage());
      }, 8000);
    }
  }, [notification]);

  return (
    <>
      {children}
      <div className={styles.notification}>
        {notification.map((message) => (
          <div className={styles.message}>{message}</div>
        ))}
      </div>
    </>
  );
};
