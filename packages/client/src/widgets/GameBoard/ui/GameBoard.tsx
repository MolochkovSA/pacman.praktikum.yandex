import { useState, useCallback, useEffect } from 'react';
import { useGameLoop } from '@/features/GameControl/model/useGameLoop';
import { useMovement } from '@/features/PlayerMovement/useMovement';
import { ghostImages } from '@/shared/const/ghostImages';
import { Button } from '@/shared/ui';
import { Game } from './Game';
import { StartGameModal } from '@/features/StartGame/ui/StartGameModal';
import { GameOverModal } from '@/features/GameOver/ui/GameOverModal';
import { Lives } from '@/entities/Lives';

import styles from './GameBoard.module.scss';

export const GameBoard = () => {
  const [isGameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('hideGameOverModal')) {
      setGameStarted(true);
    }
  }, [isGameStarted]);

  const {
    player,
    setDirection,
    foods,
    ghosts,
    score,
    resetGame,
    direction,
    isPaused,
    setIsPaused,
    isWin,
    isGameOver,
    setGameOver,
    lives
  } = useGameLoop(isGameStarted, setGameStarted);

  const handleRestart = useCallback(() => {
    resetGame();
    setGameStarted(true);
    setGameOver(false);
    setIsPaused(true);
  }, [resetGame, setGameOver, setIsPaused]);

  useMovement(setDirection);
  return (
    <>
      <div className={styles.score}>Очки: {score}</div>
      <Lives lives={lives} />
      {!isGameStarted && !isGameOver && <StartGameModal onStart={() => setGameStarted(true)} />}

      {isGameStarted && (
        <Game
          isPaused={isPaused}
          player={player}
          foods={foods}
          ghosts={ghosts}
          ghostImages={ghostImages}
          direction={direction}
          setIsPaused={setIsPaused}
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
