import { ProfileLink } from './ProfileLink/ProfileLink';

import styles from './ForumPage.module.scss';
import { Input } from '@/shared/ui';

type Props = {};

export const ForumPage = () => {
  return (
    <main className={styles.page}>
      <aside className={styles.leftBar}>
        <header>
          <ProfileLink />
        </header>
        <nav>links</nav>
      </aside>
      <div>
        <header>header</header>
        <main>main</main>
        <footer>footer</footer>
      </div>
    </main>
  );
};
