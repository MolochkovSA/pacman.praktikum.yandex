import { Outlet } from 'react-router';

import styles from './AuthLayout.module.scss';

export const AuthLayout = () => {
  return (
    <main className={styles.layout}>
      <Outlet />
    </main>
  );
};
