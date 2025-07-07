import { Modal } from '@/shared/ui';
import { useState } from 'react';
import { ArrowFatUp, ArrowFatDown, ArrowFatLeft, ArrowFatRight } from 'phosphor-react';

import styles from './StartModal.module.scss';

type Props = {
  onStart: () => void;
};

export const StartGameModal = ({ onStart }: Props) => {
  const [isChecked, setChecked] = useState(false);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    setChecked(value);
    localStorage.setItem('hideGameOverModal', value.toString());
  };

  return (
    <Modal
      showModal={true}
      showCloseButton={false}
      title="Начало игры"
      okButton={{ label: 'Начать игру', type: 'button', onClick: onStart }}>
      <div className={styles.start}>
        <ul className={styles.start__list}>
          <li>Cъешь всю еду на карте, избегая встречи с призраками</li>
          <li>Набирай очки и продвигайся по турнирной таблице</li>
          <li>
            Используй клавиатуру для передвижения:
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
          </li>
          <li>
            Для полноэкранного режима
            <div className={styles.start__keys}>
              <span>ALT</span> + <span>F</span>
            </div>
          </li>
          <label className={styles.start__checkbox}>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            Больше не показывать
          </label>
        </ul>
      </div>
    </Modal>
  );
};
