import App from '../ui/App';
import { LoginPage } from '@/pages/login';
import { SignUpPage } from '@/pages/signup';
import { ProfilePage } from '@/pages/profile';
import { ErrorPage } from '@/pages/error';
// import { GamePage } from '@/pages/game';
import { ForumPage } from '@/pages/forum';
import { HomeLayout } from '@/pages/home-layout';
import { ForumTopicViewPage } from '@/pages/forum-topic-view';
import { ForumTopicEditPage, topicLoader } from '@/pages/forum-topic-edit';
import { LeaderBoardPage } from '@/pages/leader-board';
import { HomePage } from '@/pages/home';
import { AuthLayout } from '@/pages/auth-layout';
import { preloadUser } from '@/entities/user/lib/preloadUser';

export const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage errorType="500" />,
    children: [
      {
        path: '',
        element: <HomeLayout />,
        fetchData: preloadUser,
        children: [
          { index: true, element: <HomePage /> },
          {
            path: 'profile',
            element: <ProfilePage />
          },
          {
            path: 'leaderboard',
            element: <LeaderBoardPage />
          },
          {
            path: 'forum',
            children: [
              { index: true, element: <ForumPage /> },
              { path: 'posting', element: <ForumTopicEditPage /> },
              {
                path: ':topicId',
                children: [
                  { index: true, element: <ForumTopicViewPage /> },
                  { path: 'edit', loader: topicLoader, element: <ForumTopicEditPage /> }
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
      // {
      //   path: '/game',
      //   element: <GamePage />
      // },
      {
        path: '*',
        element: <ErrorPage errorType="404" />
      },
      {
        path: '/500',
        element: <ErrorPage errorType="500" />
      }
    ]
  }
];
