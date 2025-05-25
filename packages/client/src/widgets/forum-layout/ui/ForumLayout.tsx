import { PropsWithChildren } from 'react';

import styles from './ForumLayout.module.scss';

type Props = {
  top?: React.ReactNode;
};

export const ForumLayout = ({ top, children }: Props & PropsWithChildren) => {
  return (
    <div className={styles.layout}>
      <div className={styles.header}>{top}</div>
      {children}
    </div>
  );
};
