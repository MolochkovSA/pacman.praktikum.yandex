import { RiFilePaper2Line } from 'react-icons/ri';

import styles from './TopicRow.module.scss';
import { Link } from 'react-router-dom';
import { TopicPreview } from '../../model/types';
import { getProfilePath, getTopicPath } from '@/shared/lib/router';

type Props = {
  topic: TopicPreview;
};

export const TopicRow = ({ topic: { id, title, author, commentsCount, lastComment } }: Props) => {
  const topicUrl = getTopicPath(id);
  const authorProfileUrl = getProfilePath(author.id);
  const commentatorProfileUrl = getProfilePath(lastComment.author.id);

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
          {author.login}
        </Link>
      </td>
      <td>{commentsCount}</td>
      <td className={styles.lastComment}>
        <time>{lastComment.createdAt.toLocaleString()}</time>
        <Link
          className={styles.author}
          to={commentatorProfileUrl}>
          {lastComment.author.login}
        </Link>
      </td>
    </tr>
  );
};
