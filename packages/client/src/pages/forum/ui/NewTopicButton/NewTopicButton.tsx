import { BsPlusLg } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared/ui';

import styles from './NewTopicButton.module.scss';

export const NewTopicButton = () => {
  const navigate = useNavigate();

  const goToNewTopic = () => navigate('/forum/posting');

  return (
    <Button
      className={styles.button}
      onClick={goToNewTopic}>
      <BsPlusLg size={16} />
      <span>Новая тема</span>
    </Button>
  );
};
