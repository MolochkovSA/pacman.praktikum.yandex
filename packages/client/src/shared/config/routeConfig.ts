type RecursiveRoutes<T> = {
  [K in keyof T]: T[K] extends string ? string : RecursiveRoutes<T[K]>;
};

export const AppRoutes = {
  MAIN: '',
  AUTH: {
    ROOT: 'auth',
    LOGIN: 'login',
    SIGNUP: 'signup'
  },
  PROFILE: {
    ROOT: 'profile',
    VIEW: ':profileId'
  },
  LEADERBOARD: 'leaderboard',
  GAME: 'game',
  FORUM: {
    ROOT: 'forum',
    POSTING: 'posting',
    TOPIC: {
      ROOT: ':topicId',
      EDIT: 'edit'
    }
  },
  SERVER_ERROR: '500',
  NOT_FOUND: '*'
} as const;

export const RoutePath: RecursiveRoutes<typeof AppRoutes> = {
  MAIN: '/',
  AUTH: {
    ROOT: '/auth',
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup'
  },
  PROFILE: {
    ROOT: '/profile',
    VIEW: '/profile/:profileId'
  },
  LEADERBOARD: '/leaderboard',
  GAME: '/game',
  FORUM: {
    ROOT: '/forum',
    POSTING: '/forum/posting',
    TOPIC: {
      ROOT: '/forum/:topicId',
      EDIT: '/forum/:topicId/edit'
    }
  },
  SERVER_ERROR: '/500',
  NOT_FOUND: '*'
};
