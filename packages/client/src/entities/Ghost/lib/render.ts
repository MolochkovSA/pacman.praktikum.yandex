import { tileSize } from '@/entities/Map';
import { Vector2D } from '@/shared/model/vector';

export const renderGhosts = (ctx: CanvasRenderingContext2D, ghosts: Vector2D[]) => {
  ghosts.forEach((ghost, i) => {
    const colors = ['red', 'pink', 'cyan', 'orange'];
    ctx.fillStyle = colors[i % colors.length];

    // // Восстанавливаем нормальную непрозрачность для остальных объектов
    ctx.globalAlpha = 1;
    ctx.beginPath();
    ctx.arc(ghost.x * tileSize + tileSize / 2, ghost.y * tileSize + tileSize / 2, tileSize / 2.5, 0, Math.PI * 2);
    ctx.fill();
  });
};
