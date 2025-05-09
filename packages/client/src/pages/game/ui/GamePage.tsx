import { GameBoard } from '@/widgets/GameBoard/GameBoard';
import { memo } from 'react';
import styles from './GamePage.module.scss';
export const GamePage = memo(() => {
  return (
    <main>
      <section className={styles.container}>
        <div className={styles.game}>
          <h1 className={styles.title}>Pacman</h1>
          <GameBoard />
        </div>
      </section>
    </main>
  );
});
