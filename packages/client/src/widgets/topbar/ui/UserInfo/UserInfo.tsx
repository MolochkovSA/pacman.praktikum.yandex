import React, { useState } from 'react';
import clsx from 'clsx';
import { GrFireball } from 'react-icons/gr';

import defaultAvatar from '@/assets/images/avatar.png';

import styles from './UserInfo.module.scss';

interface Props {
  show: boolean;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

function UserInfo({ show, onClick }: Props, ref: React.Ref<HTMLDivElement>) {
  const [isActive, setIsActive] = useState(false);
  const login = 'Winner of the world'; // Todo: get from store
  const achievement = 1000; // Todo: get from store

  return (
    <div
      className={styles.wrapper}
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
        setIsActive(!isActive);
      }}>
      <img
        className={clsx(styles.avatar, { [styles.active]: show })}
        src={defaultAvatar}
        width={48}
        height={48}
        alt="avatar"
      />
      <div className={styles.info}>
        <span className={clsx(styles.login, { [styles.active]: show })}>{login}</span>
        <div className={styles.achievement}>
          <GrFireball />
          <span>{achievement}</span>
        </div>
      </div>
    </div>
  );
}

export default React.forwardRef(UserInfo);
