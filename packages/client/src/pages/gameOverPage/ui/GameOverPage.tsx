import { useNavigate } from 'react-router-dom';
import { Button } from '@/shared/ui';
import styles from './GameOverPage.module.scss';
export const GameOverPage = () => {
  const isWin = true;
  const navigate = useNavigate();

  return (
    <main>
      <section className={styles.container}>
        <div className={styles.game}>
          <h1 className={styles.title}>{isWin ? 'Вы победили!' : 'Игра окончена'}</h1>
          <p className={styles.score}>Счет: 200</p>
          <Button
            name="Играть"
            onClick={() => navigate('/game')}
          />
        </div>
      </section>
    </main>
  );
};
