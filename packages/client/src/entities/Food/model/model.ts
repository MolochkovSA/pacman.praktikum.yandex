import { Vector2D } from '@/shared/model/vector';
import { map } from '@/entities/Map';

export const generateFood = (): Vector2D[] => {
  const foodPositions: Vector2D[] = [];
  map.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell === 0) {
        foodPositions.push({ x, y });
      }
    });
  });

  return foodPositions;
};

export const isSamePosition = (a: Vector2D, b: Vector2D): boolean => a.x === b.x && a.y === b.y;
