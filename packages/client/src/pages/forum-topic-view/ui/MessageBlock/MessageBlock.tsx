import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

import styles from './MessageBlock.module.scss';

type Props = {
  themeDescription?: string;
  text: string;
  createdAt: Date;
  author: {
    id: number;
    display_name: string;
    avatar: string;
  };
};

export const MessageBlock = ({
  themeDescription,
  text,
  createdAt,
  author: { id: authorId, display_name, avatar }
}: Props) => {
  return (
    <Card>
      <Card.Body className={styles.messageBlock}>
        <div className={styles.author}>
          <Link to={`/profile/${authorId}`}>{display_name}</Link>
          <img
            src={avatar}
            alt={`avatar of ${display_name}`}
          />
        </div>

        <div className={styles.separator}></div>

        <div className={styles.content}>
          <time>{createdAt.toLocaleString()}</time>
          {themeDescription && <h3>{themeDescription}</h3>}
          <p>{text}</p>
        </div>
      </Card.Body>
    </Card>
  );
};
