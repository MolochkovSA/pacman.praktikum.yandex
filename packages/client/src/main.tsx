import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './app/styles/global.scss';
import { router } from '@/app';
import { Provider } from 'react-redux';
import { store } from '@/app/store/store.ts';
import { registerServiceWorker, unregisterServiceWorker } from './shared/lib/serviceWorker';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Suspense fallback={<div>Загрузка...</div>}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </Suspense>
  </React.StrictMode>
);

if (import.meta.env.VITE_MODE === 'development') {
  unregisterServiceWorker();
} else {
  registerServiceWorker();
}
