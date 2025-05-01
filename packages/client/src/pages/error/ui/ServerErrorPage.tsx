import React from 'react';
import styles from './ErrorLayout.module.scss';
import { Button } from '@/shared/ui';

export const ServerErrorPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.scanlines}></div>
      <h1 className={styles.title}>500</h1>
      <div className={styles.message}>Woops, internal server error</div>
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
