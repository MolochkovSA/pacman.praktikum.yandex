import { Table } from 'react-bootstrap';

import { TopicPreview } from '@/entities/topic';
import { TopicRow } from '../TopicRow/TopicRow';

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

export const TopicsTable = () => {
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

      <tbody>
        <TopicRow
          id={0}
          title="Это очень длинная тема для теста. Это очень длинная тема для теста. Это очень длинная тема для теста."
          author={{ display_name: 'test' }}
          commentsCount={0}
          lastComment={{ author: { display_name: 'test' }, createdAt: new Date() }}
        />
        <TopicRow
          id={1}
          title="Это очень длинная тема для теста. Это очень длинная тема для теста. Это очень длинная тема для теста."
          author={{ display_name: 'test' }}
          commentsCount={0}
          lastComment={{ author: { display_name: 'test' }, createdAt: new Date() }}
        />
        <TopicRow
          id={2}
          title="Это очень длинная тема для теста. Это очень длинная тема для теста. Это очень длинная тема для теста."
          author={{ display_name: 'test' }}
          commentsCount={0}
          lastComment={{ author: { display_name: 'test' }, createdAt: new Date() }}
        />
      </tbody>
    </Table>
  );
};
