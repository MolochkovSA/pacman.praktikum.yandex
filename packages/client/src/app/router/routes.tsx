import { createBrowserRouter } from 'react-router-dom';

import App from '../ui/App';
import { AppRoutes } from '@/shared/config/routeConfig';
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
    path: AppRoutes.MAIN,
    element: <App />,
    errorElement: <ErrorPage errorType="500" />,
    children: [
      {
        path: AppRoutes.AUTH.ROOT,
        lazy: AuthLayout,
        children: [
          {
            path: AppRoutes.AUTH.LOGIN,
            lazy: LoginPage
          },
          {
            path: AppRoutes.AUTH.SIGNUP,
            lazy: SignUpPage
          }
        ]
      },
      {
        path: '',
        lazy: HomeLayout,
        children: [
          { index: true, lazy: HomePage },
          {
            path: AppRoutes.PROFILE.ROOT,
            lazy: ProfilePage
          },
          {
            path: AppRoutes.LEADERBOARD,
            lazy: LeaderBoard
          },
          {
            path: AppRoutes.FORUM.ROOT,
            children: [
              { index: true, lazy: ForumPage },
              { path: AppRoutes.FORUM.POSTING, lazy: ForumTopicEditPage },
              {
                path: AppRoutes.FORUM.TOPIC.ROOT,
                children: [
                  { index: true, lazy: ForumTopicViewPage },
                  { path: AppRoutes.FORUM.TOPIC.EDIT, loader: topicLoader, lazy: ForumTopicEditPage }
                ]
              }
            ]
          }
        ]
      },
      {
        path: AppRoutes.GAME,
        element: <GamePage />
      },
      {
        path: AppRoutes.SERVER_ERROR,
        element: <ErrorPage errorType="500" />
      },
      {
        path: AppRoutes.NOT_FOUND,
        element: <ErrorPage errorType="404" />
      }
    ]
  }
]);
