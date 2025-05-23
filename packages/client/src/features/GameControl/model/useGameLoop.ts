import { useCallback, useEffect, useRef, useState } from 'react';
import { Vector2D } from '@/shared/model/vector';
import { canMoveTo } from '@/entities/Map';
import { generateFood, isSamePosition } from '@/entities/Food';
import { Player } from '@/entities/Player/model/types';
import { Direction, directionVectors } from '@/shared/model/direction';

const initialGhosts = [
  { x: 14, y: 2 },
  { x: 11, y: 10 },
  { x: 8, y: 15 }
];

export const useGameLoop = (isGameStarted: boolean, setGameStarted: React.Dispatch<React.SetStateAction<boolean>>) => {
  const [player, setPlayer] = useState<Player>({ position: { x: 1, y: 1 } });
  const [foods, setFoods] = useState(generateFood);
  const [ghosts, setGhosts] = useState<Vector2D[]>(initialGhosts);
  const [direction, setDirection] = useState<Direction>('ArrowRight');
  const [isGameOver, setGameOver] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [score, setScore] = useState(0);

  const isGameOverRef = useRef(isGameOver);
  const playerRef = useRef(player);
  const ghostsRef = useRef(ghosts);
  const directionRef = useRef(direction);
  const prevDirectionRef = useRef(direction);

  const handleGameOver = useCallback(
    (isWin: boolean) => {
      setGameOver(true);
      setIsWin(isWin);
      setGameStarted(false);
      isGameOverRef.current = true;
    },
    [setGameStarted]
  );

  useEffect(() => {
    isGameOverRef.current = isGameOver;
  }, [isGameOver]);

  useEffect(() => {
    playerRef.current = player;
  }, [player]);

  useEffect(() => {
    ghostsRef.current = ghosts;
  }, [ghosts]);

  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  const resetGame = useCallback(() => {
    const initialPlayer = { position: { x: 1, y: 1 } };
    const initialGhostsCopy = [...initialGhosts];

    setPlayer(initialPlayer);
    setFoods(generateFood());
    setGhosts(initialGhostsCopy);
    setScore(0);
    setDirection('ArrowRight');

    playerRef.current = initialPlayer;
    ghostsRef.current = initialGhostsCopy;
    directionRef.current = 'ArrowRight';
  }, []);

  useEffect(() => {
    if (!isGameStarted || isPaused || isGameOverRef.current) return;
    const interval = setInterval(() => {
      const currentDirection = prevDirectionRef.current;
      const desiredDirection = directionRef.current;

      const currentVector = directionVectors[currentDirection];
      const desiredVector = directionVectors[desiredDirection];

      const currPlayer = playerRef.current;
      const currGhosts = ghostsRef.current;

      const desiredPos = {
        x: currPlayer.position.x + desiredVector.x,
        y: currPlayer.position.y + desiredVector.y
      };

      const fallbackPos = {
        x: currPlayer.position.x + currentVector.x,
        y: currPlayer.position.y + currentVector.y
      };
      let nextPos: Vector2D = currPlayer.position;

      if (canMoveTo(desiredPos)) {
        nextPos = desiredPos;
        prevDirectionRef.current = desiredDirection;
      } else if (canMoveTo(fallbackPos)) {
        nextPos = fallbackPos;
        directionRef.current = currentDirection;
        setDirection(currentDirection);
      }
      const collided = currGhosts.some((ghost) => isSamePosition(ghost, nextPos));

      if (collided) {
        handleGameOver(false);
        return;
      }

      const updatedPlayer = { position: nextPos };
      setPlayer(updatedPlayer);
      playerRef.current = updatedPlayer;

      setFoods((prevFoods) => {
        const remaining = prevFoods.filter((food) => !isSamePosition(food, nextPos));
        if (remaining.length < prevFoods.length) {
          setScore((prev) => prev + 10);
        }
        if (remaining.length === 0) {
          handleGameOver(true);
        }
        return remaining;
      });

      const newGhosts = currGhosts.map((ghost) => {
        const dirs = Object.values(directionVectors);
        for (let i = 0; i < dirs.length; i++) {
          const dir = dirs[Math.floor(Math.random() * dirs.length)];
          const newGhostPos = { x: ghost.x + dir.x, y: ghost.y + dir.y };
          if (canMoveTo(newGhostPos)) return newGhostPos;
        }
        return ghost;
      });

      setGhosts(newGhosts);
      ghostsRef.current = newGhosts;
    }, 300);

    return () => clearInterval(interval);
  }, [handleGameOver, isGameStarted, resetGame, isPaused]);

  return {
    player,
    foods,
    ghosts,
    score,
    direction,
    setDirection,
    isPaused,
    setIsPaused,
    resetGame,
    isWin,
    isGameOver,
    setGameOver
  };
};
