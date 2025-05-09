import { Direction } from '@/features/GameControl/useGameLoop';
import { tileSize } from '../../Map/Map';
import { Player } from '../Player';

const directionToAngle: Record<Direction, number> = {
  ArrowRight: 0,
  ArrowDown: Math.PI / 2,
  ArrowLeft: Math.PI,
  ArrowUp: -Math.PI / 2
};

export const renderPlayer = (ctx: CanvasRenderingContext2D, player: Player, direction: Direction) => {
  const time = Date.now();
  const mouthOpen = (Math.sin(time / 150) + 1) / 2;
  const mouthAngle = (mouthOpen * Math.PI) / 4; // угол раскрытия рта (макс 45°)

  const baseAngle = directionToAngle[direction];
  const centerX = player.position.x * tileSize + tileSize / 2;
  const centerY = player.position.y * tileSize + tileSize / 2;
  const radius = tileSize / 2 - 2;

  ctx.fillStyle = 'yellow';
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.arc(centerX, centerY, radius, baseAngle + mouthAngle, baseAngle - mouthAngle + 2 * Math.PI, false);
  ctx.closePath();
  ctx.fill();
};
