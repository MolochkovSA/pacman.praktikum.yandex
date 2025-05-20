import { memo } from 'react';

import { GameBoard } from '@/widgets/GameBoard';

import styles from './GamePage.module.scss';

export const GamePage = memo(function GamePage() {
  return (
    <main className={styles.game}>
      <h1 className={styles.title}>Pacman</h1>
      <GameBoard />
    </main>
  );
});
