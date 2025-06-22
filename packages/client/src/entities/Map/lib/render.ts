import wall from '@/assets/textures/wall.jpg';

let tileImage: HTMLImageElement | null = null;

if (typeof window !== 'undefined') {
  tileImage = new Image();
  tileImage.src = wall;
}

export const renderMap = (ctx: CanvasRenderingContext2D, mapData: number[][], tileSize: number) => {
  if (!tileImage) return;
  mapData.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell === 1) {
        ctx.drawImage(tileImage, x * tileSize, y * tileSize, tileSize, tileSize);
      }
    });
  });
};
