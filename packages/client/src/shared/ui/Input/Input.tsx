import styles from './Input.module.scss';
import React from 'react';

export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  required?: boolean;
  label: string;
  name: string;
  value?: string;
  pattern?: string;
  min?: number;
  max?: number;
  type?: 'text' | 'password';
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = (props: Props) => {
  return (
    <div className={styles.input__wrapper + ' ' + props.className}>
      <label
        htmlFor={props.name}
        className={styles.input__label}>
        {props.label}
      </label>
      <input
        {...props}
        className={styles.input}
        onChange={props.handleChange}
      />
    </div>
  );
};
