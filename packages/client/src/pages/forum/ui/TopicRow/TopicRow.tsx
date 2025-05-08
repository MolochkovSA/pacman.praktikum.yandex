import { RiFilePaper2Line } from 'react-icons/ri';

import styles from './TopicRow.module.scss';
import { Link } from 'react-router-dom';

type User = { id: number; display_name: string };

type Props = {
  id: number;
  title: string;
  author: User;
  commentsCount: number;
  lastComment: {
    author: User;
    createdAt: Date;
  };
};

export const TopicRow = ({ id, title, author, commentsCount, lastComment }: Props) => {
  const topicUrl = `/forum/${id}`;
  const authorProfileUrl = `/profile/${author.id}`;
  const commentatorProfileUrl = `/profile/${lastComment.author.id}`;

  return (
    <tr className={styles.row}>
      <td className={styles.link}>
        <Link to={topicUrl}>
          <RiFilePaper2Line size={16} />
        </Link>
      </td>
      <td className={styles.link}>
        <Link to={topicUrl}>{title}</Link>
      </td>
      <td>
        <Link
          className={styles.author}
          to={authorProfileUrl}>
          {author.display_name}
        </Link>
      </td>
      <td>{commentsCount}</td>
      <td className={styles.lastComment}>
        <time>{lastComment.createdAt.toLocaleString()}</time>
        <Link
          className={styles.author}
          to={commentatorProfileUrl}>
          {lastComment.author.display_name}
        </Link>
      </td>
    </tr>
  );
};
