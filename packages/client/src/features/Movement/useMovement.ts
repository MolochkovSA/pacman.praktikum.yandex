// import { Direction } from '@/entities/Player/Player';
// import { useEffect } from 'react';

// export const useMovement = (setDirection: (dir: Direction) => void) => {
//   useEffect(() => {
//     const handleKey = (e: KeyboardEvent) => {
//       switch (e.key) {
//         case 'ArrowUp':
//           setDirection('up');
//           break;
//         case 'ArrowDown':
//           setDirection('down');
//           break;
//         case 'ArrowLeft':
//           setDirection('left');
//           break;
//         case 'ArrowRight':
//           setDirection('right');
//           break;
//       }
//     };
//     window.addEventListener('keydown', handleKey);
//     return () => window.removeEventListener('keydown', handleKey);
//   }, [setDirection]);
// };
// src/features/Movement/useMovement.ts
import { useEffect } from 'react';

type Direction = 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight';

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
