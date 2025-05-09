import { tileSize } from '@/entities/Map';

export const renderMap = (ctx: CanvasRenderingContext2D, mapData: number[][]) => {
  ctx.fillStyle = 'blue';
  mapData.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell === 1) {
        ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
      }
    });
  });
};
