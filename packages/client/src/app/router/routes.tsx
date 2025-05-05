import { BrowserRouter as Router, createBrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import App from '../ui/App';
import { LoginPage } from '../../pages/login';
import { SignUpPage } from '../../pages/signup';
import { NotFoundPage } from '@/pages/not-found';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
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
        path: '/not_found',
        element: <NotFoundPage />
      }
      // {
      //   path: '/profile',
      //   element: <SignUpPage />
      // },
      // {
      //   path: '/home',
      //   element: <SignUpPage />
      // },
      // {
      //   path: '/game',
      //   element: <SignUpPage />
      // },
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
