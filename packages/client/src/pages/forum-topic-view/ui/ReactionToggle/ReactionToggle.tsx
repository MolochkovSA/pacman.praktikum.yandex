import React from 'react';

import styles from './ReactionToggle.module.scss';

interface Props {
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

function UserInfo({ onClick }: Props, ref: React.Ref<HTMLDivElement>) {
  return (
    <div
      className={styles.wrapper}
      ref={ref}
      onClick={onClick}>
      😀
    </div>
  );
}

export default React.forwardRef(UserInfo);
