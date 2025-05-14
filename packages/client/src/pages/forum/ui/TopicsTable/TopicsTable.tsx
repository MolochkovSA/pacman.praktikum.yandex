import { Table } from 'react-bootstrap';

import { TopicRow } from '../TopicRow/TopicRow';
import { TopicPreview } from '../../model/types';

import styles from './TopicsTable.module.scss';

const topicHeaders: Record<keyof Omit<TopicPreview, 'id'>, string> = {
  title: 'Тема',
  author: 'Автор',
  commentsCount: 'Сообщений',
  lastComment: 'Последнее сообщение'
};

const headers: React.ReactElement[] = Object.entries(topicHeaders).map(([value, label]) => (
  <th key={value}>{label}</th>
));

type Props = {
  topics: TopicPreview[];
};

export const TopicsTable = ({ topics }: Props) => {
  const topicsList = topics.map((topic) => (
    <TopicRow
      key={topic.id}
      topic={topic}
    />
  ));

  if (!topicsList.length) return <div className={styles.noData}>Форум пуст</div>;

  return (
    <Table
      hover
      className={styles.table}>
      <thead>
        <tr>
          <th></th>
          {headers}
        </tr>
      </thead>
      <tbody>{topicsList}</tbody>
    </Table>
  );
};
