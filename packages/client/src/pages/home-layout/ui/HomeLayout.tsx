import { Outlet } from 'react-router';

import { Topbar } from '@/widgets/topbar';
import { withAuthGuard } from '@/features/auth';

import styles from './HomeLayout.module.scss';

export const HomeLayout = withAuthGuard(function HomeLayout() {
  return (
    <div className={styles.layout}>
      <Topbar />

      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
});
