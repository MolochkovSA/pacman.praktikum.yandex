import { useState } from 'react';
import clsx from 'clsx';

import { AvatarModal } from '../AvatarModal/AvatarModal';

import styles from './Avatar.module.scss';

export interface Props {
  className?: string;
  src: string;
}

export const Avatar = ({ className, src }: Props) => {
  const [isShowedModal, setShowModal] = useState(false);

  return (
    <div className={clsx(styles.avatar, className)}>
      <div className={styles.avatar__container}>
        <img
          src={src}
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
