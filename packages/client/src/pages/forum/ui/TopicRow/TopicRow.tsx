import { RiFilePaper2Line } from 'react-icons/ri';
import styles from './TopicRow.module.scss';
import { Link } from 'react-router-dom';
import { TopicPreview } from '../../model/types';
import { getTopicPath } from '@/shared/lib/router';

type Props = {
  topic: TopicPreview;
};

export const TopicRow = ({ topic: { id, title, author, amountComments, lastComment } }: Props) => {
  const topicUrl = getTopicPath(id);

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
        <span className={styles.author}> {author ?? 'Неизвестный автор'}</span>
      </td>
      <td>{amountComments}</td>
      <td className={styles.lastComment}>
        {lastComment ? (
          <>
            <time>{lastComment.createdAt.toLocaleString()}</time>{' '}
            <span className={styles.author}>{lastComment.author}</span>
          </>
        ) : (
          <span>Комментариев нет</span>
        )}
      </td>
    </tr>
  );
};
