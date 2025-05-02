import { PropsWithChildren } from 'react';

import styles from './ForumLayout.module.scss';

type Props = {
  title: string;
  actions?: React.ReactNode;
};

export const ForumLayout = ({ title, actions, children }: Props & PropsWithChildren) => {
  return (
    <div className={styles.forumLayout}>
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        {actions}
      </div>
      {children}
    </div>
  );
};
