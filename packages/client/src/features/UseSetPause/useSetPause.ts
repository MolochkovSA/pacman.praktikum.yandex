import { useEffect } from 'react';

type UsePauseOnSpaceProps = {
  isPaused: boolean;
  setIsPaused: (isPaused: boolean) => void;
};

export const useSetPause = ({ isPaused, setIsPaused }: UsePauseOnSpaceProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        if (isPaused) {
          setIsPaused(false);
        } else {
          setIsPaused(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPaused, setIsPaused]);
};
