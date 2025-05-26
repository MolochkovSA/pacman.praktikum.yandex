import { IconLink } from '@/shared/ui';
import { Icon } from './Icon/Icon';

import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <div className={styles.home}>
      <h1 className={styles.title}>PACMAN</h1>
      <div className={styles.menu}>
        <hr />
        <nav>
          <IconLink to="/game">
            <Icon
              src="pacman"
              size={50}
            />
            Игра
          </IconLink>

          <IconLink to="/profile">
            <Icon
              src="pacman"
              size={50}
            />
            Профиль
          </IconLink>

          <IconLink to="/leaderboard">
            <Icon
              src="pacman"
              size={50}
            />
            Лидерборд
          </IconLink>

          <IconLink to="/forum">
            <Icon
              src="pacman"
              size={50}
            />
            Форум
          </IconLink>
        </nav>
        <hr />
      </div>
    </div>
  );
};
