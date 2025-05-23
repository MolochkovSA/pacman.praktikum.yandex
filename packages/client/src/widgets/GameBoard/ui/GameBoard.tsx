import { useGameLoop } from '@/features/GameControl/model/useGameLoop';
import { useMovement } from '@/features/PlayerMovement/useMovement';
import { ghostImages } from '@/shared/const/ghostImages';
import { Button } from '@/shared/ui';
import { Game } from './Game';

import styles from './GameBoard.module.scss';

// const ghostImages: HTMLImageElement[] = [];
// const colors = ['pink', 'green', 'blue'];

// colors.forEach((color) => {
//   const img = new Image();
//   img.src = `/src/assets/images/ghosts/${color}.svg`;
//   ghostImages.push(img);
// });
export const GameBoard = () => {
  const { player, setDirection, foods, ghosts, score, resetGame, direction } = useGameLoop();
  useMovement(setDirection);
  return (
    <>
      <div className={styles.score}>Очки: {score}</div>
      <Game
        player={player}
        foods={foods}
        ghosts={ghosts}
        ghostImages={ghostImages}
        direction={direction}
      />

      <Button onClick={resetGame}>Restart</Button>
    </>
  );
};
