import React from 'react';
import styles from './Error.module.scss';

interface Props {
  error?: string;
  className?: string;
}

export const ErrorMessage: React.FC<Props> = ({ error, className }) => {
  if (!error) return null;

  return <span className={styles.error + ' ' + className}>{error}</span>;
};
