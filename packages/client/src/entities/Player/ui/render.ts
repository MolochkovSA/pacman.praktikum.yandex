import { Direction } from '@/shared/model/direction';
import { Player } from '../model/types';

const directionToAngle: Record<Direction, number> = {
  ArrowRight: 0,
  ArrowDown: Math.PI / 2,
  ArrowLeft: Math.PI,
  ArrowUp: -Math.PI / 2
};

export const renderPlayer = (ctx: CanvasRenderingContext2D, player: Player, direction: Direction, tileSize: number) => {
  const time = Date.now();
  const smoothFactor = 150;
  const amplitude = 0.25;

  const mouthOpen = (Math.sin(time / smoothFactor) + 1) / 2;
  const mouthAngle = mouthOpen * Math.PI * amplitude;

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
