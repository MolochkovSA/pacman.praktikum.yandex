import { TopicViewRequestDto } from '../model/types';

const generateMockTopicView = (id: number) => {
  return {
    id,
    title: 'Тема для теста',
    themeDescription: 'Описание темы для теста',
    text: 'Очень длинный текст для теста, написанный ИИ прошлого века или что-то вроде этого, чтобы проверить работоспособность страницы, но это не важно, так как она не используется в реальном проекте. lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    author: {
      id: 0,
      login: 'Автор темы',
      avatar: null
    },
    createdAt: '2022-01-01T00:00:00.000Z'
  };
};

const generateMockCommentView = (id: number) => {
  return {
    id,
    text: 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    author: {
      id: id * 3 + 1,
      login: 'Автор' + (id + 1),
      avatar: null
    },
    reactions: [
      { commentId: 1, reactionId: 2, author: 'Bob' },
      { commentId: 1, reactionId: 1, author: 'Alice' },
      { commentId: 1, reactionId: 2, author: 'Charlie' }
    ],
    createdAt: '2022-01-01T00:00:00.000Z'
  };
};

export const getMockTopicVew = ({ id, limit }: TopicViewRequestDto) => {
  return {
    topic: generateMockTopicView(id),
    comments: Array.from({ length: limit }, (_, index) => generateMockCommentView(index)),
    total: 27
  };
};
