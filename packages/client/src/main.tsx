import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import { router, store } from '@/app';

import './app/styles/global.scss';

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    {/* <Suspense fallback={<div>Загрузка...</div>}> */}
    {/* <Provider store={store}> */}
    <div>Test</div>
    {/* <RouterProvider router={router} /> */}
    {/* </Provider> */}
    {/* </Suspense> */}
  </React.StrictMode>
);
