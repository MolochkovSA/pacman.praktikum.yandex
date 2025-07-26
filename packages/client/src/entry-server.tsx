import ReactDOM from 'react-dom/server';
import { Request as ExpressRequest } from 'express';
import { Provider } from 'react-redux';
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router-dom/server';
import { redirect } from 'react-router';
import crypto from 'crypto';

import { routes, store } from './app';
import { createFetchRequest } from './entry-server.utils.ts';
import { userActions } from './entities/user/index.ts';
import { RoutePath } from './shared/config/routeConfig.ts';

export const render = async (req: ExpressRequest, apiUrl: string) => {
  const { query, dataRoutes } = createStaticHandler(routes);
  const fetchRequest = createFetchRequest(req);
  const context = await query(fetchRequest);

  if (context instanceof Response) {
    throw context;
  }

  const headers = new Headers();

  const cookieHeader = req.headers['cookie'];

  if (cookieHeader) {
    if (Array.isArray(cookieHeader)) {
      headers.set('cookie', cookieHeader.join('; '));
    } else if (typeof cookieHeader === 'string') {
      headers.set('cookie', cookieHeader);
    }
  }

  const response = await fetch(`${apiUrl}/auth/user`, {
    headers,
    credentials: 'include'
  });

  if (response.ok) {
    const data = await response.json();
    store.dispatch(userActions.setUser(data));

    if (req.originalUrl === RoutePath.AUTH.LOGIN || req.originalUrl === RoutePath.AUTH.SIGNUP) {
      throw redirect(RoutePath.MAIN);
    }
  } else if (req.originalUrl !== RoutePath.AUTH.LOGIN && req.originalUrl !== RoutePath.AUTH.SIGNUP) {
    store.dispatch(userActions.clearState());
    throw redirect(RoutePath.AUTH.LOGIN);
  }

  const router = createStaticRouter(dataRoutes, context);

  const cspNonce = crypto.randomBytes(16).toString('base64');

  return {
    html: ReactDOM.renderToString(
      <Provider store={store}>
        <StaticRouterProvider
          router={router}
          context={context}
        />
      </Provider>
    ),
    initialState: store.getState(),
    cspNonce
  };
};
