import { useGameLoop } from '@/features/GameControl/useGameLoop';
import { useMovement } from '@/features/Movement/useMovement';
import { Button, Game } from '@/shared/ui';
import styles from './GameBoard.module.scss';
const ghostImages: HTMLImageElement[] = [];
const colors = ['pink', 'green', 'blue'];

colors.forEach((color) => {
  const img = new Image();
  img.src = `/src/assets/images/ghosts/${color}.svg`;
  ghostImages.push(img);
});
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

      <Button
        handleClick={resetGame}
        name="Restart"
      />
    </>
  );
};
