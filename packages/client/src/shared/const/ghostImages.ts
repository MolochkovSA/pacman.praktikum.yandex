const colors = ['pink', 'green', 'blue'];
export const ghostImages: HTMLImageElement[] = colors.map((color) => {
  const img = new Image();
  img.src = `/src/assets/images/ghosts/${color}.svg`;
  return img;
});
