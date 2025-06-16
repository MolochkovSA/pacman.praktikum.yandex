export const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const formattedTime = `${mins.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  return formattedTime;
};
