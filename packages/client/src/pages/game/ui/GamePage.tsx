import { memo, useRef } from 'react';

import { GameBoard } from '@/widgets/GameBoard';
import { useFullscreen } from '@/features/FullScreen/useFullScreen';

import styles from './GamePage.module.scss';

export const GamePage = memo(function GamePage() {
  const gameContainerRef = useRef<HTMLDivElement>(null);

  const { isFullscreen, toggleFullscreen } = useFullscreen();

  return (
    <main
      ref={gameContainerRef}
      className={styles.game}>
      <h1 className={styles.title}>Pacman</h1>
      <GameBoard />
      <button
        className={styles.game__button}
        onClick={toggleFullscreen}>
        {isFullscreen ? '[Выйти из полноэкранного режима]' : '[На весь экран]'}
      </button>
    </main>
  );
});
