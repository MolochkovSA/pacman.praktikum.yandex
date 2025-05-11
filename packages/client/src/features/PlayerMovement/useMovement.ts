import { Direction } from '@/shared/model/direction';
import { useEffect } from 'react';

export const useMovement = (onDirectionChange: (direction: Direction) => void) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const keys: Direction[] = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
      if (keys.includes(e.key as Direction)) {
        onDirectionChange(e.key as Direction);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onDirectionChange]);
};
