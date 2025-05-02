import styles from './Card.module.scss';

type Props = {
  children: React.ReactNode;
};

export const Card = ({ children }: Props) => <div className={styles.card}>{children}</div>;
