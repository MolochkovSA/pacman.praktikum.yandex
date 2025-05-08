import { useEffect, useState } from 'react';
import { Player } from '@/entities/Player';
import { Vector2D } from '@/shared/model/vector';
import { canMoveTo, map } from '@/entities/Map';
import { generateFood, isSamePosition } from '@/entities/Food';

type Direction = 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight';

const directionVectors: Record<Direction, Vector2D> = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 }
};
const initialGhosts = [
  { x: 14, y: 1 },
  { x: 1, y: 3 }
];
export const useGameLoop = () => {
  const [player, setPlayer] = useState<Player>({ position: { x: 1, y: 1 } });
  const [foods, setFoods] = useState(generateFood);
  const [ghosts, setGhosts] = useState<Vector2D[]>(initialGhosts);
  const [direction, setDirection] = useState<Direction>('ArrowRight');
  const [score, setScore] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const vector = directionVectors[direction];
      const newPos = {
        x: player.position.x + vector.x,
        y: player.position.y + vector.y
      };
      if (canMoveTo(newPos)) {
        setPlayer((prev) => ({ ...prev, position: newPos }));

        setFoods((prevFoods) => {
          const remaining = prevFoods.filter((food) => !isSamePosition(food, newPos));
          if (remaining.length < prevFoods.length) {
            setScore((prev) => prev + 10);
          }
          return remaining;
        });
        const isDead = ghosts.some((ghost) => isSamePosition(ghost, newPos));
        if (isDead) {
          alert('Game Over!');
          setPlayer({ position: { x: 1, y: 1 } });
          setFoods(generateFood);
          setGhosts(initialGhosts);
          setScore(0);
          return;
        }
      }

      setGhosts((prevGhosts) =>
        prevGhosts.map((ghost) => {
          const possibleDirs = Object.values(directionVectors);
          for (let i = 0; i < possibleDirs.length; i++) {
            const dir = possibleDirs[Math.floor(Math.random() * possibleDirs.length)];
            const newGhostPos = { x: ghost.x + dir.x, y: ghost.y + dir.y };
            if (canMoveTo(newGhostPos)) return newGhostPos;
          }
          return ghost;
        })
      );
    }, 200);

    return () => clearInterval(interval);
  }, [player, direction]);

  return {
    player,
    foods,
    ghosts,
    score,
    setDirection
  };
};
