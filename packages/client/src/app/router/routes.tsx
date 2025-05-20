import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../ui/App';
import { LoginPage } from '@/pages/login';
import { SignUpPage } from '@/pages/signup';
import { ProfilePage } from '@/pages/profile';
import { ErrorPage } from '@/pages/error';
import { GamePage } from '@/pages/game';
import { ForumPage } from '@/pages/forum';
import { LayoutWithTopbar } from '@/pages/layout-with-topbar';
import { ForumTopicViewPage } from '@/pages/forum-topic-view';
import { ForumTopicEditPage, topicLoader } from '@/pages/forum-topic-edit';
import { GameOverPage } from '@/pages/gameOverPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage errorType="500" />,
    children: [
      {
        index: true,
        element: (
          <Navigate
            to="/login"
            replace
          />
        )
      },
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/signup',
        element: <SignUpPage />
      },
      {
        path: 'forum',
        lazy: LayoutWithTopbar,
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
      },
      {
        path: '/*',
        element: <ErrorPage errorType="404" />
      },
      {
        path: '/500',
        element: <ErrorPage errorType="500" />
      },
      {
        path: '/profile',
        element: <ProfilePage />
      },
      // {
      //   path: '/home',
      //   element: <SignUpPage />
      // },
      {
        path: '/game',
        element: <GamePage />
      },
      {
        path: '/game_over',
        element: <GameOverPage />
      }
      // {
      //   path: '/leaderboard',
      //   element: <SignUpPage />
      // },
      // {
      //   path: '/forum',
      //   element: <SignUpPage />
      // },
      // {
      //   path: '/forum/:id',
      //   element: <SignUpPage />
      // },
      // {
      //   path: '/server_error',
      //   element: <SignUpPage />
      // }
    ]
  }
]);
