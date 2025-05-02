import { NavLink } from 'react-router';

import { UserDropdown } from './UserDropdown/UserDropdown';
import logo from '@/assets/images/pacman-logo.png';

import styles from './topbar.module.scss';
import { PropsWithChildren } from 'react';

export const Topbar = ({ children }: PropsWithChildren) => {
  return (
    <header className={styles.topbar}>
      <NavLink to="/">
        <img
          alt="logo"
          width={64}
          height={64}
          src={logo}
        />
      </NavLink>

      {children}

      <UserDropdown />
    </header>
  );
};
