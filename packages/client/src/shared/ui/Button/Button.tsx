import { Button as BootstrapButton, ButtonProps } from 'react-bootstrap';

import styles from './Button.module.scss';
import clsx from 'clsx';

export const Button = ({ className, as, ...props }: ButtonProps) => {
  return (
    <BootstrapButton
      as="button"
      {...props}
      className={clsx(styles.button, className)}
    />
  );
};
