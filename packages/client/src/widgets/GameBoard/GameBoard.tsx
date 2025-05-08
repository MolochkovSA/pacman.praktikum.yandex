import { useGameLoop } from '@/features/GameControl/useGameLoop';
import { useMovement } from '@/features/Movement/useMovement';
import { Game } from '@/shared/ui';

export const GameBoard = () => {
  const { player, setDirection, foods, ghosts, score } = useGameLoop();
  useMovement(setDirection);
  return (
    <>
      <div style={{ color: 'white', marginBottom: '10px' }}>Score: {score}</div>
      <Game
        player={player}
        foods={foods}
        ghosts={ghosts}
      />
    </>
  );
};
