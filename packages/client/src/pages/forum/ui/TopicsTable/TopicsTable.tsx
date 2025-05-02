import { Table } from 'react-bootstrap';

import { Topic } from '@/entities/topic';

import styles from './TopicsTable.module.scss';
import { TopicRow } from '../TopicRow/TopicRow';

const topicHeaders: Record<keyof Pick<Topic, 'author' | 'title' | 'commentsCount' | 'lastComment'>, string> = {
  title: 'Тема',
  author: 'Автор',
  commentsCount: 'Сообщений',
  lastComment: 'Последнее сообщение'
};

const headers: JSX.Element[] = Object.entries(topicHeaders).map(([value, label]) => <th key={value}>{label}</th>);

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
          id={0}
          title="Это очень длинная тема для теста. Это очень длинная тема для теста. Это очень длинная тема для теста."
          author={{ display_name: 'test' }}
          commentsCount={0}
          lastComment={{ author: { display_name: 'test' }, createdAt: new Date() }}
        />
        <TopicRow
          id={0}
          title="Это очень длинная тема для теста. Это очень длинная тема для теста. Это очень длинная тема для теста."
          author={{ display_name: 'test' }}
          commentsCount={0}
          lastComment={{ author: { display_name: 'test' }, createdAt: new Date() }}
        />
      </tbody>
    </Table>
  );
};
