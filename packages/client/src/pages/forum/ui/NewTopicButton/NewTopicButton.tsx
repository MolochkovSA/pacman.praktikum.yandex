import { BsPlusLg } from 'react-icons/bs';

import { ButtonStyledLink } from '@/shared/ui';

import styles from './NewTopicButton.module.scss';

export const NewTopicButton = () => {
  return (
    <ButtonStyledLink to="/forum/posting">
      <BsPlusLg size={16} />
      <span className={styles.text}>Новая тема</span>
    </ButtonStyledLink>
  );
};
