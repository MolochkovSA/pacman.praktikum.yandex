import wall from '@/assets/textures/wall.jpg';

export const renderMap = (ctx: CanvasRenderingContext2D, mapData: number[][], tileSize: number) => {
  const tileImage = new Image();
  tileImage.src = wall;

  console.log(tileImage);

  mapData.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell === 1) {
        ctx.drawImage(tileImage, x * tileSize, y * tileSize, tileSize, tileSize);
      }
    });
  });
};
