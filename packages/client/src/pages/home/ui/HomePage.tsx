import { IconLink } from '@/shared/ui';
import { Icon } from './Icon/Icon';

import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <div className={styles.home}>
      <div className={styles.title}>PACMAN</div>
      <div className={styles.menu}>
        <hr className={styles.line} />
        <nav className={styles.navigation}>
          <IconLink
            className={styles.link}
            to={'/game'}>
            <div className={styles.link__children}>
              <Icon
                className={styles.link__icon}
                src={'pacman'}
                size={50}
              />
              {'Игра'}
            </div>
          </IconLink>
          <IconLink
            className={styles.link}
            to={'/profile'}>
            <div className={styles.link__children}>
              <Icon
                className={styles.link__icon}
                src={'pacman'}
                size={50}
              />
              {'Профиль'}
            </div>
          </IconLink>
          <IconLink
            className={styles.link}
            to={'/leaderboard'}>
            <div className={styles.link__children}>
              <Icon
                className={styles.link__icon}
                src={'pacman'}
                size={50}
              />
              {'Лидерборд'}
            </div>
          </IconLink>
          <IconLink
            className={styles.link}
            to={'/forum'}>
            <div className={styles.link__children}>
              <Icon
                className={styles.link__icon}
                src={'pacman'}
                size={50}
              />
              {'Форум'}
            </div>
          </IconLink>
        </nav>
        <hr className={styles.line} />
      </div>
    </div>
  );
};
