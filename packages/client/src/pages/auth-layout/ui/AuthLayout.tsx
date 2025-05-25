import { Outlet } from 'react-router';

import { withAuthGuard } from '@/features/auth';

import styles from './AuthLayout.module.scss';

export const AuthLayout = withAuthGuard(function AuthLayout() {
  return (
    <main className={styles.layout}>
      <Outlet />
    </main>
  );
}, true);
