import { useState } from 'react';
import { useGameLoop } from '@/features/GameControl/model/useGameLoop';
import { useMovement } from '@/features/PlayerMovement/useMovement';
import { Button } from '@/shared/ui';
import styles from './GameBoard.module.scss';
import { Game } from './Game';
import { ghostImages } from '@/shared/const/ghostImages';
import { StartGameModal } from '@/features/StartGame/ui/StartGameModal';

export const GameBoard = () => {
  const [isGameStarted, setGameStarted] = useState(false);
  const { player, setDirection, foods, ghosts, score, resetGame, direction } = useGameLoop(isGameStarted);

  useMovement(setDirection);
  return (
    <>
      <div className={styles.score}>Очки: {score}</div>
      {!isGameStarted && <StartGameModal onStart={() => setGameStarted(true)} />}
      {isGameStarted && (
        <Game
          player={player}
          foods={foods}
          ghosts={ghosts}
          ghostImages={ghostImages}
          direction={direction}
        />
      )}

      <Button
        handleClick={resetGame}
        name="Restart"
      />
    </>
  );
};
