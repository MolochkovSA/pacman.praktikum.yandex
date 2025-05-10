import { DEFAULT_TOPICS_ON_SCREEN } from '../constants';

export const mockTopicList = {
  topics: Array.from({ length: DEFAULT_TOPICS_ON_SCREEN }, (_, index) => ({
    id: index + 1,
    title: `Mock topic ${index + 1}`,
    themeDescription: `Mock description ${index + 1}`,
    text: `Mock text ${index + 1}`,
    author: { id: index + 1, display_name: `Mock author ${index + 1}` },
    lastComment: {
      id: index + 1,
      createdAt: new Date(),
      author: { id: index * 11 + 1, display_name: `Mock commentator ${index + 1}` }
    },
    commentsCount: 10
  })),
  total: 27
};
