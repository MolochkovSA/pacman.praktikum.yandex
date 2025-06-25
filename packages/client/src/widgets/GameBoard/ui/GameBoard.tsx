import { useState, useCallback, useEffect, useRef } from 'react';
import { useGameLoop } from '@/features/GameControl/model/useGameLoop';
import { useMovement } from '@/features/PlayerMovement/useMovement';
import { Button } from '@/shared/ui';
import { Game } from './Game';
import { StartGameModal } from '@/features/StartGame/ui/StartGameModal';
import { GameOverModal } from '@/features/GameOver/ui/GameOverModal';
import { Lives } from '@/entities/Lives';
import { GameTimer } from '@/features/gameTimer';

import styles from './GameBoard.module.scss';

export const GameBoard = () => {
  const [isGameStarted, setGameStarted] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

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
    setSeconds(0);
    timerRef.current = null;
  }, [resetGame, setGameOver, setIsPaused]);

  useMovement(setDirection);
  return (
    <>
      <div className={styles.score}>Очки: {score}</div>
      <div className={styles.data}>
        <GameTimer
          intervalRef={timerRef}
          isGameOver={isGameOver}
          isPaused={isPaused}
          isGameStarted={isGameStarted}
          seconds={seconds}
          setSeconds={setSeconds}></GameTimer>
        <Lives lives={lives} />
      </div>
      {!isGameStarted && !isGameOver && <StartGameModal onStart={() => setGameStarted(true)} />}

      {isGameStarted && (
        <Game
          isPaused={isPaused}
          player={player}
          foods={foods}
          ghosts={ghosts}
          direction={direction}
          setIsPaused={setIsPaused}
        />
      )}
      <Button onClick={resetGame}>Restart</Button>
      {isGameOver && (
        <GameOverModal
          onRestart={handleRestart}
          score={score}
          isWin={isWin}
          seconds={seconds}></GameOverModal>
      )}
    </>
  );
};
