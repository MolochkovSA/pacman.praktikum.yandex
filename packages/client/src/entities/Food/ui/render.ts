import { Vector2D } from '@/shared/model/vector';
import wall from '@/assets/textures/food.png';

let foodImage: HTMLImageElement | null = null;

if (typeof window !== 'undefined') {
  foodImage = new Image();
  foodImage.src = wall;
}

export const renderFood = (ctx: CanvasRenderingContext2D, foods: Vector2D[], tileSize: number) => {
  if (!foodImage) return;

  const imageSize = tileSize / 2;

  foods.forEach(({ x, y }) => {
    const offsetX = x * tileSize + (tileSize - imageSize) / 2;
    const offsetY = y * tileSize + (tileSize - imageSize) / 2;

    ctx.drawImage(foodImage, offsetX, offsetY, imageSize, imageSize);
  });
};
