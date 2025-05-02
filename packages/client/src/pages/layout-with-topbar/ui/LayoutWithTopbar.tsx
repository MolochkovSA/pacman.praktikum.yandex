import { Outlet } from 'react-router';

import { Topbar } from '@/widgets/topbar';

import styles from './LayoutWithTopbar.module.scss';

export default function LayoutWithTopbar() {
  return (
    <div className={styles.layout}>
      <Topbar />

      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
