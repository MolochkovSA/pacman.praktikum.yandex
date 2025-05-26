import { FC, PropsWithChildren, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deleteLastMessage, selectNotifications } from '../model/notificationSlice';

import styles from './Notification.module.scss';

export const Notification: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch();
  const notification = useSelector(selectNotifications);

  useEffect(() => {
    if (notification.length > 0) {
      setTimeout(() => {
        dispatch(deleteLastMessage());
      }, 8000);
    }
  }, [notification, dispatch]);

  return (
    <>
      {children}
      <div className={styles.notification}>
        {notification.map((message, index) => (
          <div
            key={index}
            className={styles.message}>
            {message}
          </div>
        ))}
      </div>
    </>
  );
};
