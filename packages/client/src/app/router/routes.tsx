import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../ui/App';
import { LoginPage } from '@/pages/login';
import { SignUpPage } from '@/pages/signup';
import { ProfilePage } from '@/pages/profile';
import { ErrorPage } from '@/pages/error';
import { GamePage } from '@/pages/game';

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
        path: '/game',
        element: <GamePage />
      },
      {
        path: '/*',
        element: <ErrorPage errorType="404" />
      },
      {
        path: '/profile',
        element: <ProfilePage />
      }
    ]
  }
]);
