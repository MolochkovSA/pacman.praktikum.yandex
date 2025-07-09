import { useEffect } from 'react';
import styles from './GameTimer.module.scss';
import { formatTime } from '../shared/formatTime';

type Props = {
  isPaused: boolean;
  isGameOver: boolean;
  isGameStarted: boolean;
  seconds: number;
  setSeconds: React.Dispatch<React.SetStateAction<number>>;
  intervalRef: React.RefObject<NodeJS.Timeout | null>;
};

export const GameTimer = ({ isPaused, isGameStarted, isGameOver, intervalRef, setSeconds, seconds }: Props) => {
  useEffect(() => {
    const tick = () => {
      setSeconds((prev: number) => prev + 1);
    };

    if (isPaused) {
      return;
    }
    const shouldRun = isGameStarted && !isPaused;

    if (shouldRun && intervalRef.current === null) {
      intervalRef.current = setInterval(tick, 1000);
    }

    if ((!shouldRun || isGameOver) && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPaused, isGameStarted, isGameOver, intervalRef, setSeconds]);

  return (
    <div className={styles.timer}>
      <strong>{formatTime(seconds)}</strong>
    </div>
  );
};
