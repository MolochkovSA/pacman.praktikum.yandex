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

export const useGameLoop = (isGameStarted: boolean) => {
  const [player, setPlayer] = useState<Player>({ position: { x: 1, y: 1 } });
  const [foods, setFoods] = useState(generateFood);
  const [ghosts, setGhosts] = useState<Vector2D[]>(initialGhosts);
  const [direction, setDirection] = useState<Direction>('ArrowRight');

  const [score, setScore] = useState(0);

  const playerRef = useRef(player);
  const ghostsRef = useRef(ghosts);
  const directionRef = useRef(direction);
  const lastDirectionRef = useRef(direction);

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
    if (!isGameStarted) return;
    const interval = setInterval(() => {
      const currentDirection = lastDirectionRef.current;
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
      let nextPos;

      if (canMoveTo(desiredPos)) {
        nextPos = desiredPos;
        lastDirectionRef.current = desiredDirection;
      } else if (canMoveTo(fallbackPos)) {
        nextPos = fallbackPos;
        directionRef.current = currentDirection;
        setDirection(currentDirection);
      } else {
        return;
      }

      const collided = currGhosts.some((ghost) => isSamePosition(ghost, nextPos));
      if (collided) {
        alert('Конец игры!');
        resetGame();
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
  }, [isGameStarted, resetGame]);

  return {
    player,
    foods,
    ghosts,
    score,
    direction,
    setDirection,
    resetGame
  };
};
