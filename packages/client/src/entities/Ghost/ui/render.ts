import { Vector2D } from '@/shared/model/vector';
import pinkGhost from '@/assets/images/ghosts/pink.svg';
import greenGhost from '@/assets/images/ghosts/green.svg';
import blueGhost from '@/assets/images/ghosts/blue.svg';

export const ghostSrcs = [pinkGhost, greenGhost, blueGhost];
export const renderGhosts = (ctx: CanvasRenderingContext2D, ghosts: Vector2D[], tileSize: number) => {
  const ghostImages: HTMLImageElement[] = ghostSrcs.map((src) => {
    const img = new Image();
    img.src = src;
    return img;
  });

  ghosts.forEach((ghost, i) => {
    const img = ghostImages[i % ghostImages.length];
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
