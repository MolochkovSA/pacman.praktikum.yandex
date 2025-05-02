import { useNavigate } from 'react-router';
import { RiFilePaper2Line } from 'react-icons/ri';

import styles from './TopicRow.module.scss';
import { Topic, TopicId } from '@/entities/topic';

type Props = {
  id: TopicId;
  title: Topic['title'];
  author: Topic['author'];
  commentsCount: Topic['commentsCount'];
  lastComment: Topic['lastComment'];
};

export const TopicRow = ({ id, title, author, commentsCount, lastComment }: Props) => {
  const navigate = useNavigate();

  const goToTopic = () => navigate(`/forum/topic/${id}`);
  const goToProfile = () => navigate(`/profile/${author.id}`);

  return (
    <tr className={styles.row}>
      <td className={styles.link}>
        <RiFilePaper2Line
          size={16}
          onClick={goToTopic}
        />
      </td>
      <td className={styles.link}>
        <span onClick={goToTopic}>{title}</span>
      </td>
      <td>{author.display_name}</td>
      <td>{commentsCount}</td>
      <td className={styles.lastComment}>
        <div>{lastComment.createdAt.toLocaleString()}</div>
        <div
          className={styles.author}
          onClick={goToProfile}>
          {lastComment.author.display_name}
        </div>
      </td>
    </tr>
  );
};
