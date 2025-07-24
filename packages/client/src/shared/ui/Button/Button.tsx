import { Button as BootstrapButton, ButtonProps } from 'react-bootstrap';
import { clsx } from 'clsx';

import styles from './Button.module.scss';

export const Button = ({ className, as = 'button', ...props }: ButtonProps) => {
  return (
    <BootstrapButton
      as={as}
      {...props}
      className={clsx(styles.button, className)}
    />
  );
};
