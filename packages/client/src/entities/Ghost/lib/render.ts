import { tileSize } from '@/shared/const/game';
import { Vector2D } from '@/shared/model/vector';

export const renderGhosts = (ctx: CanvasRenderingContext2D, ghosts: Vector2D[], images: HTMLImageElement[]) => {
  ghosts.forEach((ghost, i) => {
    const img = images[i % images.length];
    const baseX = ghost.x * tileSize;
    const baseY = ghost.y * tileSize;

    ctx.drawImage(
      img,
      baseX + tileSize / 2 - tileSize / 2, // центрируем
      baseY + tileSize / 2 - tileSize / 2,
      tileSize,
      tileSize
    );
  });
};
