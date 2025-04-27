import styles from './Button.module.scss';
import React from 'react';

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  name: string;
  type?: 'button' | 'submit';
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = (props: Props) => {
  return (
    <button
      className={styles.button + ' ' + props.className}
      type={props.type}>
      {props.name}
    </button>
  );
};
