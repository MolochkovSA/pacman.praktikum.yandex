import React from 'react';
import styles from './ErrorLayout.module.scss';
import { Button } from '@/shared/ui';

type ErrorPageProps = {
  errorType?: '404' | '500';
};

export const ErrorPage = ({ errorType }: ErrorPageProps) => {
  const getErrorMessage = (errorType?: '404' | '500') => {
    switch (errorType) {
      case '500':
        return ['Woops: internal server error', 'try again later'];
      case '404':
      default:
        return ['error: page not found', 'return to start?'];
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.scanlines}></div>
      <h1 className={styles.title}>{errorType}</h1>
      <div className={styles.message}>
        {getErrorMessage(errorType).map((line, i) => {
          return <div key={i}>{line}</div>;
        })}
      </div>
      <Button
        type={'button'}
        name={'На главную'}
        handleClick={handleClick}></Button>
    </div>
  );
};

const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  return e;
};
