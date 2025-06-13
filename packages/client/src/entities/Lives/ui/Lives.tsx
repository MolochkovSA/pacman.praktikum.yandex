import { FaHeart } from 'react-icons/fa';
import styles from './Lives.module.scss';
import { totalLives } from '@/shared/const/game';
interface LivesProps {
  lives: number;
}

export const Lives = ({ lives }: LivesProps) => {
  return (
    <div className={styles.livesContainer}>
      {Array.from({ length: totalLives }).map((_, index) => (
        <FaHeart
          key={index}
          className={index >= lives ? styles.lostLife : styles.life}
        />
      ))}
    </div>
  );
};
