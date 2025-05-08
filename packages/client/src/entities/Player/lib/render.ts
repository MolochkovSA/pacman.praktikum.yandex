import { tileSize } from '../../Map/Map';
import { Player } from '../Player';

export const renderPlayer = (ctx: CanvasRenderingContext2D, player: Player) => {
  ctx.fillStyle = 'yellow';
  ctx.beginPath();
  ctx.arc(
    player.position.x * tileSize + tileSize / 2,
    player.position.y * tileSize + tileSize / 2,
    tileSize / 2 - 2,
    0,
    2 * Math.PI
  );
  ctx.fill();
};
