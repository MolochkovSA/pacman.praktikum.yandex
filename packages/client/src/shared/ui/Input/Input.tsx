import styles from './Input.module.scss';
import React, { forwardRef } from 'react';

export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  isInvalid?: boolean;
  type?: 'text' | 'password';
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, Props>(function Input({ error, isInvalid, ...props }, ref) {
  return (
    <div className={styles.input__wrapper + ' ' + props.className}>
      <label
        htmlFor={props.name}
        className={styles.input__label}>
        {props.label}
      </label>
      <input
        ref={ref}
        {...props}
        className={`${styles.input} ${isInvalid ? styles.invalid : ''}`}
      />
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
});
