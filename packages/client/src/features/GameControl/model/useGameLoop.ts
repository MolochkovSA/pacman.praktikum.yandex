import { useCallback, useEffect, useRef, useState } from 'react';
import { Vector2D } from '@/shared/model/vector';
import { canMoveTo } from '@/entities/Map';
import { generateFood, isSamePosition } from '@/entities/Food';
import { Player } from '@/entities/Player/model/types';
import { Direction, directionVectors } from '@/shared/model/direction';
import { GhostMode } from '@/shared/model/ghostMode';

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
  const [lives, setLives] = useState(3);
  const [ghostMode, setGhostMode] = useState<GhostMode>('scatter');

  const playerRef = useRef(player);
  const ghostsRef = useRef(ghosts);
  const directionRef = useRef(direction);
  useEffect(() => {
    const modeInterval = setInterval(() => {
      setGhostMode((prev) => (prev === 'scatter' ? 'chase' : 'scatter'));
    }, 5000); // каждые 5 секунд меняется режим

    return () => clearInterval(modeInterval);
  }, []);
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
    setLives(3);

    playerRef.current = initialPlayer;
    ghostsRef.current = initialGhostsCopy;
    directionRef.current = 'ArrowRight';
  }, []);

  useEffect(() => {
    if (!isGameStarted) return;
    const interval = setInterval(() => {
      const vector = directionVectors[directionRef.current];
      const currPlayer = playerRef.current;
      const currGhosts = ghostsRef.current;

      const newPos = {
        x: currPlayer.position.x + vector.x,
        y: currPlayer.position.y + vector.y
      };

      let updatedPlayer = playerRef.current;
      if (canMoveTo(newPos)) {
        updatedPlayer = { position: newPos };
        setPlayer(updatedPlayer);
        playerRef.current = updatedPlayer;

        setFoods((prevFoods) => {
          const remaining = prevFoods.filter((food) => !isSamePosition(food, newPos));
          if (remaining.length < prevFoods.length) {
            setScore((prev) => prev + 10);
          }
          return remaining;
        });
      }

      const collided = currGhosts.some((ghost) => isSamePosition(ghost, updatedPlayer.position));
      if (collided) {
        if (lives > 1) {
          setLives((prev) => prev - 1);
          setPlayer({ position: { x: 1, y: 1 } });
          playerRef.current = { position: { x: 1, y: 1 } };
        } else {
          alert('Игра окончена!');
          resetGame();
        }
        return;
      }

      setPlayer(updatedPlayer);
      playerRef.current = updatedPlayer;

      setFoods((prevFoods) => {
        const remaining = prevFoods.filter((food) => !isSamePosition(food, newPos));
        if (remaining.length < prevFoods.length) {
          setScore((prev) => prev + 10);
        }
        return remaining;
      });

      const newGhosts = currGhosts.map((ghost) => {
        // приведения движутся за игроком
        if (ghostMode === 'chase') {
          const dx = player.position.x - ghost.x;
          const dy = player.position.y - ghost.y;

          const preferredDir = Math.abs(dx) > Math.abs(dy) ? { x: Math.sign(dx), y: 0 } : { x: 0, y: Math.sign(dy) };

          const targetPos = { x: ghost.x + preferredDir.x, y: ghost.y + preferredDir.y };

          if (canMoveTo(targetPos)) return targetPos;
        }

        // хаотичное движение
        const dirs = Object.values(directionVectors);
        for (let i = 0; i < dirs.length; i++) {
          const dir = dirs[Math.floor(Math.random() * dirs.length)];
          const pos = { x: ghost.x + dir.x, y: ghost.y + dir.y };
          if (canMoveTo(pos)) return pos;
        }

        return ghost;
      });

      setGhosts(newGhosts);
      ghostsRef.current = newGhosts;
    }, 300);

    return () => clearInterval(interval);
  }, [isGameStarted, resetGame, lives, ghostMode, player.position.x, player.position.y]);

  return {
    player,
    foods,
    ghosts,
    score,
    direction,
    setDirection,
    resetGame,
    lives
  };
};
