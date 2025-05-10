import { useState } from 'react';
import styles from './Avatar.module.scss';
import { AvatarModal } from '@/features/changeAvatar/ui';

export interface Props {
  className?: string;
  src: string;
}

export const Avatar = (props: Props) => {
  const [isShowedModal, setShowModal] = useState(false);

  return (
    <div className={styles.avatar + ' ' + props.className}>
      <div className={styles.avatar__container}>
        <img
          src={props.src}
          alt="no img no img no img"
        />
        <div
          className={styles.avatar__shadow}
          onClick={() => setShowModal(true)}>
          <p>Изменить</p>
        </div>
      </div>
      <AvatarModal
        show={isShowedModal}
        onHide={() => setShowModal(false)}></AvatarModal>
    </div>
  );
};
