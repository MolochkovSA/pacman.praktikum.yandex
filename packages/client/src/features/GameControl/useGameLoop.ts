import { useCallback, useEffect, useState } from 'react';
import { Player } from '@/entities/Player';
import { Vector2D } from '@/shared/model/vector';
import { canMoveTo } from '@/entities/Map';
import { generateFood, isSamePosition } from '@/entities/Food';

export type Direction = 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight';

const directionVectors: Record<Direction, Vector2D> = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 }
};

const initialGhosts = [
  { x: 14, y: 2 },
  { x: 11, y: 10 },
  { x: 8, y: 15 }
];

export const useGameLoop = () => {
  const [player, setPlayer] = useState<Player>({ position: { x: 1, y: 1 } });
  const [foods, setFoods] = useState(generateFood);
  const [ghosts, setGhosts] = useState<Vector2D[]>(initialGhosts);
  const [direction, setDirection] = useState<Direction>('ArrowRight');
  const [score, setScore] = useState(0);

  const resetGame = useCallback(() => {
    const initialPlayer = { position: { x: 1, y: 1 } };
    const initialGhostsCopy = [...initialGhosts];

    setPlayer(initialPlayer);
    setFoods(generateFood());
    setGhosts(initialGhostsCopy);
    setScore(0);
    setDirection('ArrowRight');
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const vector = directionVectors[direction];
      const newPos = {
        x: player.position.x + vector.x,
        y: player.position.y + vector.y
      };

      if (!canMoveTo(newPos)) return;

      const collided = ghosts.some((ghost) => isSamePosition(ghost, newPos));
      if (collided) {
        alert('Конец игры!');
        resetGame();
        return;
      }

      const updatedPlayer = { position: newPos };
      setPlayer(updatedPlayer);

      setFoods((prevFoods) => {
        const remaining = prevFoods.filter((food) => !isSamePosition(food, newPos));
        if (remaining.length < prevFoods.length) {
          setScore((prev) => prev + 10);
        }
        return remaining;
      });

      const newGhosts = ghosts.map((ghost) => {
        const dirs = Object.values(directionVectors);
        for (let i = 0; i < dirs.length; i++) {
          const dir = dirs[Math.floor(Math.random() * dirs.length)];
          const newGhostPos = { x: ghost.x + dir.x, y: ghost.y + dir.y };
          if (canMoveTo(newGhostPos)) return newGhostPos;
        }
        return ghost;
      });

      setGhosts(newGhosts);
    }, 300);

    return () => clearInterval(interval);
  }, [direction, player, ghosts, resetGame]);

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
