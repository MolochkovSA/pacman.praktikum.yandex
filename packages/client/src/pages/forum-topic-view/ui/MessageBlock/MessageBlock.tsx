import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

import { getProfilePath } from '@/shared/lib/router';
import { getAvatarSrc } from '@/shared/lib/getAvatarSrc';

import styles from './MessageBlock.module.scss';

type Props = {
  themeDescription?: string;
  text: string;
  createdAt: Date;
  author: {
    id: number;
    login: string;
    avatar: string | null;
  };
};

export const MessageBlock = ({ themeDescription, text, createdAt, author: { id: authorId, login, avatar } }: Props) => {
  return (
    <Card>
      <Card.Body className={styles.messageBlock}>
        <div className={styles.author}>
          <Link to={getProfilePath(authorId)}>{login}</Link>
          <img
            src={getAvatarSrc(avatar)}
            alt={`avatar of ${login}`}
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
