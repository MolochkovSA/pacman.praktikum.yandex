import { FaChevronRight } from 'react-icons/fa';

import { IconLink } from '@/shared/ui';

import styles from './ProfileLink.module.scss';

export const ProfileLink = () => {
  return (
    <IconLink
      to="#"
      label="Профиль"
      rightIcon={<FaChevronRight />}
      className={styles.link}
    />
  );
};
