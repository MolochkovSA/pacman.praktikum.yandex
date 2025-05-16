import { BaseModal } from '@/shared/ui/Modal/modal';
import { ArrowFatUp, ArrowFatDown, ArrowFatLeft, ArrowFatRight } from 'phosphor-react';

import styles from './StartModal.module.scss';

type Props = {
  onStart: () => void;
};

export const StartGameModal = ({ onStart }: Props) => {
  return (
    <BaseModal
      show={true}
      title="Начало игры"
      btnText="Начать игру"
      onHide={() => {}}
      submit={onStart}
      closeBtn={false}>
      <div className={styles.start}>
        <p>{'>'} Cъешь всю еду на карте, избегая встречи с призраками</p>
        <p>{'>'} Набирай очки и продвигайся по турнирной таблице</p>
        <p>{'>'} Используй клавиатуру для передвижения:</p>
        <div className={styles.start__controls}>
          <div className={styles.start__controls__row}>
            <div className={styles.start__controls__key}>
              <ArrowFatUp size={50} />
              <span>Вверх</span>
            </div>
          </div>
          <div className={styles.start__controls__row}>
            <div className={styles.start__controls__key}>
              <ArrowFatLeft size={50} />
              <span>Влево</span>
            </div>
            <div className={styles.start__controls__key}>
              <ArrowFatDown size={50} />
              <span>Вниз</span>
            </div>
            <div className={styles.start__controls__key}>
              <ArrowFatRight size={50} />
              <span>Вправо</span>
            </div>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};
