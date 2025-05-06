import styles from './Avatar.module.scss';

export interface Props {
  className?: string;
  src: string;
}

export const Avatar = (props: Props) => {
  return (
    <div className={styles.avatar + ' ' + props.className}>
      <div className={styles.avatar__container}>
        <img
          src={props.src}
          alt="no img no img no img"
        />
        <div className={styles.avatar__shadow}>
          <p>Изменить</p>
        </div>
      </div>
    </div>
  );
};
