import React, { useState } from 'react';
import clsx from 'clsx';
import { GrFireball } from 'react-icons/gr';

import { getAvatarSrc } from '@/shared/lib/getAvatarSrc';
import { useAuth } from '@/features/auth';

import styles from './UserInfo.module.scss';

interface Props {
  show: boolean;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

function UserInfo({ show, onClick }: Props, ref: React.Ref<HTMLDivElement>) {
  const [isActive, setIsActive] = useState(false);
  const { user } = useAuth();
  const achievement = 1000; // Todo: get from store

  return (
    <div
      className={styles.wrapper}
      ref={ref}
      onClick={(e) => {
        onClick(e);
        setIsActive(!isActive);
      }}>
      <img
        className={clsx(styles.avatar, { [styles.active]: show })}
        src={getAvatarSrc(user?.avatar)}
        alt="avatar"
      />
      <div className={styles.info}>
        <span className={clsx(styles.login, { [styles.active]: show })}>{user?.login}</span>
        <div className={styles.achievement}>
          <GrFireball />
          <span>{achievement}</span>
        </div>
      </div>
    </div>
  );
}

export default React.forwardRef(UserInfo);
