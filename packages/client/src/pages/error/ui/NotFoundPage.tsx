import React from 'react';
import styles from './ErrorLayout.module.scss';
import { Button } from '@/shared/ui';

export const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.scanlines}></div>
      <h1 className={styles.title}>404</h1>
      <div className={styles.message}>
        error: page not found
        <br />
        return to start?
      </div>
      <Button
        type={'submit'}
        name={'На главную'}
        handleClick={handleClick}></Button>
    </div>
  );
};

const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  return 0;
};
