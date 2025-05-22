import { Direction } from '@/shared/model/direction';

import { Player } from '../model/types';
import { tileSize } from '@/shared/const/game';

const directionToAngle: Record<Direction, number> = {
  ArrowRight: 0,
  ArrowDown: Math.PI / 2,
  ArrowLeft: Math.PI,
  ArrowUp: -Math.PI / 2
};

export const renderPlayer = (ctx: CanvasRenderingContext2D, player: Player, direction: Direction) => {
  // const time = Date.now();
  // const mouthOpen = (Math.sin(time / 150) + 1) / 2;
  // const mouthAngle = (mouthOpen * Math.PI) / 4; // угол раскрытия рта (макс 45°)
  const time = Date.now();
  const smoothFactor = 150; // увеличим для замедления колебания
  const amplitude = 0.25; // максимум = 0.25 * π (≈ 45°), можно уменьшить

  const mouthOpen = (Math.sin(time / smoothFactor) + 1) / 2; // от 0 до 1
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
