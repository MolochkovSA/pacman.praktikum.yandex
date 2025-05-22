import { useState, useCallback } from 'react';
import { useGameLoop } from '@/features/GameControl/model/useGameLoop';
import { useMovement } from '@/features/PlayerMovement/useMovement';
import { ghostImages } from '@/shared/const/ghostImages';
import { Button } from '@/shared/ui';
import { Game } from './Game';
import { StartGameModal } from '@/features/StartGame/ui/StartGameModal';
import { GameOverModal } from '@/features/GameOver/ui/GameOverModal';

import styles from './GameBoard.module.scss';

export const GameBoard = () => {
  const [isGameStarted, setGameStarted] = useState(false);
  const [isGameOver, setGameOver] = useState(false);
  const [isWin, setIsWin] = useState(false);

  const handleGameOver = useCallback((isWin: boolean) => {
    setGameOver(true);
    setIsWin(isWin);
    setGameStarted(false);
  }, []);

  const { player, setDirection, foods, ghosts, score, resetGame, direction } = useGameLoop(
    isGameStarted,
    handleGameOver
  );

  const handleRestart = useCallback(() => {
    resetGame();
    setGameStarted(true);
    setGameOver(false);
  }, [resetGame]);

  useMovement(setDirection);
  return (
    <>
      <div className={styles.score}>Очки: {score}</div>
      {!isGameStarted && !isGameOver && <StartGameModal onStart={() => setGameStarted(true)} />}
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
      {isGameOver && (
        <GameOverModal
          onRestart={handleRestart}
          score={score}
          isWin={isWin}></GameOverModal>
      )}
    </>
  );
};
