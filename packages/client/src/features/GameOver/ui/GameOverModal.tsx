import { Modal } from '@/shared/ui/Modal/Modal';
import { useNavigate } from 'react-router-dom';

import { RoutePath } from '@/shared/config/routeConfig';
import { useGameOver } from '../hooks/useGameOver';
import { formatTime } from '@/features/gameTimer';

import styles from './GameOver.module.scss';

type GameOverModalProps = {
  onRestart: () => void;
  score: number;
  seconds: number;
  isWin: boolean;
};

export const GameOverModal = ({ onRestart, score, isWin, seconds }: GameOverModalProps) => {
  const navigate = useNavigate();

  useGameOver({ seconds, score });

  const title = isWin ? 'Вы победили!' : 'Игра окончена!';
  const message = isWin ? (
    <>
      <p className={styles.gameover_icon}>🎉 Поздравляем! 🎉</p>
      <p>Вы съели всю еду и одержали победу!</p>
    </>
  ) : (
    <>
      <p className={styles.gameover_icon}> 👻 Вы столкнулись с привидением! </p>
      <p>Сыграем еще раз?</p>
    </>
  );

  const handleNavigate = () => {
    navigate(RoutePath.MAIN);
  };
  return (
    <Modal
      showModal={true}
      showCloseButton={false}
      title={title}
      okButton={{ label: 'Играть снова', type: 'button', onClick: onRestart }}
      cancelButton={{ label: 'На главную', type: 'button', onClick: handleNavigate }}>
      <div className={styles.gameover}>
        {message}
        <p className={styles.gameover_score}>
          Ваши очки: <strong>{score}</strong>
        </p>
        <p className={styles.gameover_score}>
          Ваше время: <strong>{formatTime(seconds)}</strong>
        </p>
      </div>
    </Modal>
  );
};
