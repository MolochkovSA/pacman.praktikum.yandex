import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './app/styles/global.scss';
import { ForumPage } from './pages/forum';
import { LoginPage } from './pages/login';
import { LayoutWithTopbar } from './pages/layout-with-topbar';

const router = createBrowserRouter([
  {
    path: '/forum',
    lazy: LayoutWithTopbar,
    children: [{ index: true, element: <ForumPage /> }]
  },
  {
    path: '/login',
    element: <LoginPage />
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);
