import { BaseModal } from '@/shared/ui/Modal/modal';
import styles from './GameOver.module.scss';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared/ui';

type GameOverModalProps = {
  onRestart: () => void;
  score: number;
  isWin: boolean;
};

export const GameOverModal = ({ onRestart, score, isWin }: GameOverModalProps) => {
  const navigate = useNavigate();
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
    navigate('/');
  };
  return (
    <BaseModal
      show={true}
      title={title}
      btnText="Играть снова"
      onHide={() => {}}
      submit={onRestart}
      closeBtn={false}
      size="xl"
      footer={<Button onClick={handleNavigate}>На главную</Button>}>
      <div className={styles.gameover}>
        {message}
        <p className={styles.gameover_score}>
          Ваши очки: <strong>{score}</strong>
        </p>
      </div>
    </BaseModal>
  );
};
