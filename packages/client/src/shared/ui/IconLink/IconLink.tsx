import { Link } from 'react-router-dom';
import clsx from 'clsx';

import styles from './IconLink.module.scss';

interface Props extends React.HTMLAttributes<HTMLAnchorElement> {
  label: string;
  to: string;
  className?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const IconLink = ({ label, to, className, leftIcon, rightIcon, ...props }: Props) => {
  return (
    <Link
      to={to}
      className={clsx(styles.link, className)}
      {...props}>
      {leftIcon}
      <span>{label}</span>
      {rightIcon}
    </Link>
  );
};
