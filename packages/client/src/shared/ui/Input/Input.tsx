import { InputProps } from './Input.model';
import styles from './Input.module.scss';

export const Input = (props: InputProps) => {
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
