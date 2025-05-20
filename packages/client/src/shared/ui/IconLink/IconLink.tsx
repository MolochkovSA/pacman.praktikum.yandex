import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

import styles from './IconLink.module.scss';

interface Props extends React.HTMLAttributes<HTMLAnchorElement> {
  to: string;
  className?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const IconLink = ({ children, to, className, leftIcon, rightIcon, ...props }: Props) => {
  return (
    <NavLink
      to={to}
      className={clsx(styles.link, className)}
      {...props}>
      {leftIcon}
      <span>{children}</span>
      {rightIcon}
    </NavLink>
  );
};
