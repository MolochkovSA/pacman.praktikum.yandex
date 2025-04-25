import styles from './Button.module.scss';
import { ButtonProps } from './Button.model';

export const Button = (props: ButtonProps) => {
  return (
    <button
      className={styles.button + ' ' + props.className}
      onClick={props.handleClick}
      type={props.type}>
      {props.name}
    </button>
  );
};
