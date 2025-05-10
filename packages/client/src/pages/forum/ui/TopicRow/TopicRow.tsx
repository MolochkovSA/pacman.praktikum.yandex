import { RiFilePaper2Line } from 'react-icons/ri';

import styles from './TopicRow.module.scss';
import { Link } from 'react-router-dom';
import { TopicPreview } from '../../model/types';

type Props = {
  topic: TopicPreview;
};

export const TopicRow = ({ topic: { id, title, author, commentsCount, lastComment } }: Props) => {
  const topicUrl = `/forum/${id}`;
  const authorProfileUrl = `/profile/${author.id}`;
  const commentatorProfileUrl = `/profile/${lastComment.author.id}`;

  return (
    <tr className={styles.row}>
      <td>
        <Link
          className={styles.link}
          to={topicUrl}>
          <RiFilePaper2Line size={16} />
        </Link>
      </td>
      <td>
        <Link
          className={styles.link}
          to={topicUrl}>
          {title}
        </Link>
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
