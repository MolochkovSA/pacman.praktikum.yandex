import { PropsWithChildren } from 'react';
import { NavLink, NavLinkProps } from 'react-router';
import clsx from 'clsx';

import styles from './ButtonStyledLink.module.scss';

export interface Props extends NavLinkProps {
  className?: string;
}

export function ButtonStyledLink({ className, children, ...props }: Props & PropsWithChildren) {
  return (
    <NavLink
      className={clsx(styles.link, className)}
      {...props}>
      {children}
    </NavLink>
  );
}
