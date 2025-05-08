import { TopicView } from '@/entities/topic';
import { Breadcrumbs } from '@/shared/ui';
import { ForumLayout } from '@/widgets/forum-layout';
import { MessageBlock } from './MessageBlock/MessageBlock';

import defaultAvatar from '@/assets/images/avatar.png';

import styles from './ForumTopicPage.module.scss';

const topicView: TopicView = {
  id: 0,
  title: 'Тема для теста',
  themeDescription: 'Описание темы для теста',
  author: {
    display_name: 'Автор темы ',
    id: 0,
    avatar: defaultAvatar,
    login: 'login',
    email: 'test@test.ru',
    first_name: '',
    second_name: '',
    phone: ''
  },
  createdAt: new Date(),
  text: 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet consectetur adipiscing elit sed do elorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.iusmod tempor incididunt ut labore et dolore magna aliqua.',
  comments: [
    {
      author: {
        display_name: 'Автор',
        id: 0,
        avatar: defaultAvatar,
        login: 'login',
        email: 'test@test.ru',
        first_name: '',
        second_name: '',
        phone: ''
      },
      createdAt: new Date(),
      text: 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      id: 0
    },
    {
      author: {
        display_name: 'Автор',
        id: 0,
        avatar: defaultAvatar,
        login: 'login',
        email: 'test@test.ru',
        first_name: '',
        second_name: '',
        phone: ''
      },
      createdAt: new Date(),
      text: 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      id: 1
    },
    {
      author: {
        display_name: 'Автор',
        id: 0,
        avatar: defaultAvatar,
        login: 'login',
        email: 'test@test.ru',
        first_name: '',
        second_name: '',
        phone: ''
      },
      createdAt: new Date(),
      text: 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      id: 1
    },
    {
      author: {
        display_name: 'Автор',
        id: 0,
        avatar: defaultAvatar,
        login: 'login',
        email: 'test@test.ru',
        first_name: '',
        second_name: '',
        phone: ''
      },
      createdAt: new Date(),
      text: 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      id: 1
    }
  ]
};

export default function ForumTopicPage() {
  const { comments, ...topic } = topicView;

  const messages = comments.map((comment) => (
    <MessageBlock
      key={comment.id}
      {...comment}
    />
  ));
  return (
    <ForumLayout
      top={
        <Breadcrumbs
          links={[
            { label: 'Главная', to: '/' },
            { label: 'Форум', to: '/forum' },
            { label: topic.title, to: `/forum/${topic.id}` }
          ]}
        />
      }>
      <div className={styles.messages}>
        <MessageBlock {...topic} />
        {messages}
      </div>
    </ForumLayout>
  );
}
