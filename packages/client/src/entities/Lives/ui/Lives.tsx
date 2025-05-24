import { FaHeart } from 'react-icons/fa';
import styles from './Lives.module.scss';
interface LivesProps {
  lives: number;
}

export const Lives = ({ lives }: LivesProps) => {
  const total = 3;
  return (
    <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
      {Array.from({ length: total }).map((_, index) => (
        <FaHeart
          key={index}
          className={index >= lives ? styles.lostLife : styles.life}
        />
      ))}
    </div>
  );
};
