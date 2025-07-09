import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import './app/styles/global.scss';
import { routes, store } from '@/app';
import { registerServiceWorker, unregisterServiceWorker } from './shared/lib/serviceWorker';

const router = createBrowserRouter(routes);

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

if (import.meta.env.VITE_MODE === 'development') {
  unregisterServiceWorker();
} else {
  registerServiceWorker();
}
