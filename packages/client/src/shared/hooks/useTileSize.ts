import { useEffect, useState } from 'react';

const MIN_TILE_SIZE = 20;
const MAX_TILE_SIZE = 60;

export const useTileSize = (mapWidth: number, mapHeight: number) => {
  const [tileSize, setTileSize] = useState(40);

  useEffect(() => {
    const updateTileSize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const tileW = Math.floor(w / mapWidth);
      const tileH = Math.floor((h - 380) / mapHeight); // минус место под заголовок и кнопки
      const size = Math.max(MIN_TILE_SIZE, Math.min(MAX_TILE_SIZE, Math.min(tileW, tileH)));
      setTileSize(size);
    };

    updateTileSize();
    window.addEventListener('resize', updateTileSize);
    return () => window.removeEventListener('resize', updateTileSize);
  }, [mapWidth, mapHeight]);

  return tileSize;
};
