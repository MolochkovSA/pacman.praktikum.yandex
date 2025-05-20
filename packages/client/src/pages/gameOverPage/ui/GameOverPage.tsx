import { useNavigate } from 'react-router-dom';
import { Button } from '@/shared/ui';
import styles from './GameOverPage.module.scss';
export const GameOverPage = () => {
  const isWin = true;
  const navigate = useNavigate();

  return (
    <main>
      <section className={styles.over}>
        <h1 className={styles.title}>{isWin ? 'Вы победили!' : 'Игра окончена'}</h1>
        <p className={styles.text}>Счет: 200</p>
        <Button
          className={styles.button}
          onClick={() => navigate('/game')}>
          Играть
        </Button>
      </section>
    </main>
  );
};
