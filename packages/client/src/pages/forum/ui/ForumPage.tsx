import { ProfileLink } from './ProfileLink/ProfileLink';

import styles from './ForumPage.module.scss';
import { Card, Input } from '@/shared/ui';
import { Topbar } from '@/widgets/topbar';

type Props = {};

export const ForumPage = () => {
  return (
    <main className={styles.page}>
      <Topbar />
      {/* <aside className={styles.leftBar}>
        <header>
          <ProfileLink />
        </header>
        <nav>links</nav>
      </aside>
      <div style={{ flex: 1 }}>
        <header>header</header>
        <Card>test</Card>
        <main>main</main>
        <footer>footer</footer>
      </div> */}
    </main>
  );
};
