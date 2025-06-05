import { Outlet } from 'react-router';

import { Topbar } from '@/widgets/topbar';
import { withAuthGuard } from '@/features/auth';
import { usePage } from '@/shared/hooks/usePage';
import { preloadUser } from '@/entities/user/lib/preloadUser';

import styles from './HomeLayout.module.scss';

export const HomeLayout = withAuthGuard(function HomeLayout() {
  usePage({ initPage: preloadUser });

  return (
    <div className={styles.layout}>
      <Topbar />

      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
});
