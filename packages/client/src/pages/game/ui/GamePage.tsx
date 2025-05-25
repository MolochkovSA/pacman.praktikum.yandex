import { GameBoard } from '@/widgets/GameBoard';
import { withAuthGuard } from '@/features/auth';

import styles from './GamePage.module.scss';

export const GamePage = withAuthGuard(function GamePage() {
  return (
    <main className={styles.game}>
      <h1 className={styles.title}>Pacman</h1>
      <GameBoard />
    </main>
  );
});
