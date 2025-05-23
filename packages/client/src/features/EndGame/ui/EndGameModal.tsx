import { BaseModal } from '@/shared/ui/Modal/modal';

import styles from './EndGameModal.module.scss';
// import { Button } from '@/shared/ui';

type Props = {
  onEnd: () => void;
};

export const EndGameModal = ({ onEnd }: Props) => {
  const isWin = true;
  return (
    <BaseModal
      show={true}
      title="Конец игры"
      btnText="Играть"
      onHide={() => {}}
      submit={onEnd}
      closeBtn={false}>
      <div className={styles.over}>
        <h1 className={styles.title}>{isWin ? 'Вы победили!' : 'Игра окончена'}</h1>
        <p className={styles.text}>Счет: 200</p>
        {/* <Button
          className={styles.button}
          onClick={() => {}}>
          Играть
        </Button> */}
      </div>
    </BaseModal>
  );
};
