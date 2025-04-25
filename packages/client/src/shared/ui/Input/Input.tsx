import styles from './Input.module.scss';
import React, { forwardRef } from 'react';
import { InputProps } from '@/shared/ui/Input/Input.model';

export const Input = forwardRef<HTMLInputElement, InputProps>(({ error, isInvalid, ...props }, ref) => {
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
