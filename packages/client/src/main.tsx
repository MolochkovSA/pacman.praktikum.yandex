import React from 'react';
import ReactDOM from 'react-dom/client';
import './app/styles/global.scss';
import './app/styles/null.scss';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router/routes';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
