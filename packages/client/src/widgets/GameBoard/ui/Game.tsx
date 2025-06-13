import { renderFood } from '@/entities/Food/ui/render';
import { map } from '@/entities/Map/Map';
import { renderMap } from '@/entities/Map/lib/render';

import { renderPlayer } from '@/entities/Player/ui/render';
import { Vector2D } from '@/shared/model/vector';
import { useEffect, useRef } from 'react';
import { renderGhosts } from '@/entities/Ghost/ui/render';
import { Player } from '@/entities/Player/model/types';
import { Direction } from '@/shared/model/direction';
import styles from './GameBoard.module.scss';
import { useSetPause } from '@/features/UseSetPause/useSetPause';
import { useTileSize } from '@/shared/hooks/useTileSize';

export const Game = ({
  player,
  foods,
  ghosts,
  ghostImages,
  direction,
  isPaused,
  setIsPaused
}: {
  player: Player;
  foods: Vector2D[];
  ghosts: Vector2D[];
  ghostImages: HTMLImageElement[];
  direction: Direction;
  isPaused: boolean;
  setIsPaused: (isPaused: boolean) => void;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tileSize = useTileSize(map[0].length, map.length);
  useSetPause({ isPaused, setIsPaused });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    renderMap(ctx, map, tileSize);
    renderFood(ctx, foods, tileSize);
    renderGhosts(ctx, ghosts, ghostImages, tileSize);
    renderPlayer(ctx, player, direction, tileSize);
  }, [player, foods, ghosts, ghostImages, direction, tileSize]);

  return (
    <>
      {isPaused && (
        <div className={styles.overlay}>
          Нажмите <span> space </span> чтобы начать или поставить игру на паузу
        </div>
      )}
      <canvas
        ref={canvasRef}
        width={map[0].length * tileSize}
        height={map.length * tileSize}
        style={{ background: 'black' }}
      />
    </>
  );
};
