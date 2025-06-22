import App from '../ui/App';
import { ErrorPage } from '@/pages/error';
import { GamePage } from '@/pages/game';
import { HomePage } from '@/pages/home';

// Типизированный ленивый импорт
const AuthLayout = () => import('@/pages/auth-layout').then((m) => ({ element: <m.AuthLayout /> }));
const LoginPage = () => import('@/pages/login').then((m) => ({ element: <m.LoginPage /> }));
const SignUpPage = () => import('@/pages/signup').then((m) => ({ element: <m.SignUpPage /> }));

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
