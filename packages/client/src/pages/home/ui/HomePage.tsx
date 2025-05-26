import { IconLink } from '@/shared/ui';
import { Icon } from './Icon/Icon';

import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <div className={styles.home}>
      <h1 className={styles.title}>PACMAN</h1>
      <div className={styles.menu}>
        <hr className={styles.line} />
        <nav className={styles.navigation}>
          <IconLink
            className={styles.link}
            to="/game">
            <Icon
              src="pacman"
              size={50}
            />
            Игра
          </IconLink>

          <IconLink
            className={styles.link}
            to="/profile">
            <Icon
              src="pacman"
              size={50}
            />
            Профиль
          </IconLink>

          <IconLink
            className={styles.link}
            to="/leaderboard">
            <Icon
              src="pacman"
              size={50}
            />
            Лидерборд
          </IconLink>

          <IconLink
            className={styles.link}
            to="/forum">
            <Icon
              src="pacman"
              size={50}
            />
            Форум
          </IconLink>
        </nav>
        <hr className={styles.line} />
      </div>
    </div>
  );
};
