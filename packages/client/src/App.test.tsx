import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
// @ts-expect-error
global.TextDecoder = TextDecoder;

import App from './App';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';

const appContent = 'Вход';

// @ts-ignore
global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve('hey') }));

test('Example test', async () => {
  render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
  const r = document.textContent;
  expect(screen.getByText(appContent)).toBeDefined();
});
