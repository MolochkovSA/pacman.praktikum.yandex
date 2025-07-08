import { RiFilePaper2Line } from 'react-icons/ri';
import styles from './TopicRow.module.scss';
import { Link } from 'react-router-dom';
import { TopicPreview } from '../../model/types';
import { getProfilePath, getTopicPath } from '@/shared/lib/router';

type Props = {
  topic: TopicPreview;
};

export const TopicRow = ({ topic: { id, title, author, amountComments, lastComment } }: Props) => {
  const topicUrl = getTopicPath(id);
  // const authorProfileUrl = getProfilePath(author?? 0);

  // Проверяем lastComment перед использованием
  const commentatorProfileUrl = lastComment ? getProfilePath(lastComment.author) : '';

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
        {/* <Link
          className={styles.author}
          to={authorProfileUrl}>
          {author ?? 'Неизвестный автор'}
        </Link> */}
      </td>
      <td>{amountComments}</td>
      <td className={styles.lastComment}>
        {lastComment ? (
          <>
            <time>{lastComment.createdAt.toLocaleString()}</time>{' '}
            <Link
              className={styles.author}
              to={commentatorProfileUrl}>
              {lastComment.author}
            </Link>
          </>
        ) : (
          <span>Комментариев нет</span>
        )}
      </td>
    </tr>
  );
};
