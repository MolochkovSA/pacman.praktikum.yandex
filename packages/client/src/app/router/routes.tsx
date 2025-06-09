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
import { LeaderBoardPage } from '@/pages/leader-board';
import { HomePage } from '@/pages/home';
import { AuthLayout } from '@/pages/auth-layout';

export const routes = [
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
        element: <HomeLayout />,
        children: [
          { index: true, element: <HomePage /> },
          {
            path: AppRoutes.PROFILE.ROOT,
            element: <ProfilePage />
          },
          {
            path: AppRoutes.LEADERBOARD,
            element: <LeaderBoardPage />
          },
          {
            path: AppRoutes.FORUM.ROOT,
            children: [
              { index: true, element: <ForumPage /> },
              { path: AppRoutes.FORUM.POSTING, element: <ForumTopicEditPage /> },
              {
                path: AppRoutes.FORUM.TOPIC.ROOT,
                children: [
                  { index: true, element: <ForumTopicViewPage /> },
                  { path: AppRoutes.FORUM.TOPIC.EDIT, loader: topicLoader, element: <ForumTopicEditPage /> }
                ]
              }
            ]
          }
        ]
      },
      {
        path: 'auth',
        element: <AuthLayout />,
        children: [
          {
            path: 'login',
            element: <LoginPage />
          },
          {
            path: 'signup',
            element: <SignUpPage />
          }
        ]
      },
      {
        path: '/game',
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
];
