import { Vector2D } from '@/shared/model/vector';
import { tileSize } from '../../Map/Map';

export const renderFood = (ctx: CanvasRenderingContext2D, foods: Vector2D[]) => {
  ctx.fillStyle = 'white';
  foods.forEach(({ x, y }) => {
    ctx.beginPath();
    ctx.arc(x * tileSize + tileSize / 2, y * tileSize + tileSize / 2, 3, 0, 2 * Math.PI);
    ctx.fill();
  });
};
