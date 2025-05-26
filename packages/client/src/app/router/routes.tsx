import { createBrowserRouter } from 'react-router-dom';
import App from '../ui/App';
import { LoginPage } from '@/pages/login';
import { SignUpPage } from '@/pages/signup';
import { ProfilePage } from '@/pages/profile';
import { ErrorPage } from '@/pages/error';
import { GamePage } from '@/pages/game';
import { ForumPage } from '@/pages/forum';
import { HomeLayout } from '@/pages/home-layout';
import { ForumTopicViewPage } from '@/pages/forum-topic-view';
import { ForumTopicEditPage, topicLoader } from '@/pages/forum-topic-edit';
import { LeaderBoard } from '@/pages/leader-board';
import { HomePage } from '@/pages/home';
import { AuthLayout } from '@/pages/auth-layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage errorType="500" />,
    children: [
      {
        path: '',
        lazy: HomeLayout,
        children: [
          { index: true, lazy: HomePage },
          {
            path: 'profile',
            lazy: ProfilePage
          },
          {
            path: 'leaderboard',
            lazy: LeaderBoard
          },
          {
            path: 'forum',
            children: [
              { index: true, lazy: ForumPage },
              { path: 'posting', lazy: ForumTopicEditPage },
              {
                path: ':topicId',
                children: [
                  { index: true, lazy: ForumTopicViewPage },
                  { path: 'edit', loader: topicLoader, lazy: ForumTopicEditPage }
                ]
              }
            ]
          }
        ]
      },
      {
        path: 'auth',
        lazy: AuthLayout,
        children: [
          {
            path: 'login',
            lazy: LoginPage
          },
          {
            path: 'signup',
            lazy: SignUpPage
          }
        ]
      },
      {
        path: '/game',
        element: <GamePage />
      },
      {
        path: '/*',
        element: <ErrorPage errorType="404" />
      },
      {
        path: '/500',
        element: <ErrorPage errorType="500" />
      }
    ]
  }
]);
