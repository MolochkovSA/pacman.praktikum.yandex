import App from '../ui/App';
import { LoginPage } from '@/pages/login';
import { SignUpPage } from '@/pages/signup';
import { ErrorPage } from '@/pages/error';
import { GamePage } from '@/pages/game';
import { HomePage } from '@/pages/home';
import { AuthLayout } from '@/pages/auth-layout';

// Определяем массив маршрутов
export const routes = [
  {
    path: '',
    element: <App />,
    errorElement: <ErrorPage errorType="500" />,
    children: [
      {
        path: '/',
        element: <HomePage />,
        children: [{ index: true, element: <HomePage /> }]
      },
      {
        path: 'auth',
        lazy: AuthLayout,
        children: [
          { path: 'login', lazy: LoginPage },
          { path: 'signup', lazy: SignUpPage }
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
];
