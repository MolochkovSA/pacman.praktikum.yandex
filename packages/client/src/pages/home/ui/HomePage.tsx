import { RoutePath } from '@/shared/config/routeConfig';
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
          <IconLink to={RoutePath.GAME}>
            <Icon
              src="pacman"
              size={50}
            />
            Играть
          </IconLink>

          <IconLink to={RoutePath.PROFILE.ROOT}>
            <Icon
              src="pacman"
              size={50}
            />
            Профиль
          </IconLink>

          <IconLink to={RoutePath.LEADERBOARD}>
            <Icon
              src="pacman"
              size={50}
            />
            Лидерборд
          </IconLink>

          <IconLink to={RoutePath.FORUM.ROOT}>
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
