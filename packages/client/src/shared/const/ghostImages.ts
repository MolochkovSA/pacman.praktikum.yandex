import pinkGhost from '@/assets/images/ghosts/pink.svg';
import greenGhost from '@/assets/images/ghosts/green.svg';
import blueGhost from '@/assets/images/ghosts/blue.svg';

const ghostSrcs = [pinkGhost, greenGhost, blueGhost];

export const ghostImages: HTMLImageElement[] = ghostSrcs.map((src) => {
  const img = new Image();
  img.src = src;
  return img;
});
