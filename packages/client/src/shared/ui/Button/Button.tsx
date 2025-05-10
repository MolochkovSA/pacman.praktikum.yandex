import styles from './Button.module.scss';
import React from 'react';

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  name: string;
  type?: 'button' | 'submit';
  handleClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  color?: 'regular' | 'white';
}

export const Button = (props: Props) => {
  const colorClass = props.color === 'white' ? styles.button__secondary : styles.button;
  return (
    <button
      className={colorClass + ' ' + props.className}
      onClick={props.handleClick}
      type={props.type}>
      {props.name}
    </button>
  );
};
