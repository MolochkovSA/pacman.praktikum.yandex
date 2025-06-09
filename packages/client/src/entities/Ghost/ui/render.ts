import { Vector2D } from '@/shared/model/vector';

export const renderGhosts = (ctx: CanvasRenderingContext2D, ghosts: Vector2D[], srcs: string[], tileSize: number) => {
  const ghostImages: HTMLImageElement[] = srcs.map((src) => {
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
