import { PropsWithChildren } from 'react';
import { NavLink } from 'react-router-dom';

import { RoutePath } from '@/shared/config/routeConfig';
import logo from '@/assets/images/pacman-logo.png';
import { UserDropdown } from './UserDropdown/UserDropdown';

import styles from './topbar.module.scss';

export const Topbar = ({ children }: PropsWithChildren) => {
  return (
    <header className={styles.topbar}>
      <NavLink to={RoutePath.MAIN}>
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
