import { useState } from 'react';
import { useGameLoop } from '@/features/GameControl/model/useGameLoop';
import { useMovement } from '@/features/PlayerMovement/useMovement';
import { ghostImages } from '@/shared/const/ghostImages';
import { Button } from '@/shared/ui';
import { Game } from './Game';
import { StartGameModal } from '@/features/StartGame/ui/StartGameModal';
import { Lives } from '@/entities/Lives';

import styles from './GameBoard.module.scss';

export const GameBoard = () => {
  const [isGameStarted, setGameStarted] = useState(false);
  const { player, setDirection, foods, ghosts, score, resetGame, direction, lives } = useGameLoop(isGameStarted);

  useMovement(setDirection);
  return (
    <>
      <div className={styles.score}>Очки: {score}</div>
      <Lives lives={lives} />
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

      <Button onClick={resetGame}>Restart</Button>
    </>
  );
};
