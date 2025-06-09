import ReactDOM from 'react-dom/server';
import { Request as ExpressRequest } from 'express';
import { Provider } from 'react-redux';
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router-dom/server';

import { routes, store } from './app';
import { createFetchRequest } from './entry-server.utils.ts';

export const render = async (req: ExpressRequest) => {
  const { query, dataRoutes } = createStaticHandler(routes);
  const fetchRequest = createFetchRequest(req);
  const context = await query(fetchRequest);

  if (context instanceof Response) {
    throw context;
  }

  const router = createStaticRouter(dataRoutes, context);

  return {
    html: ReactDOM.renderToString(
      <Provider store={store}>
        <StaticRouterProvider
          router={router}
          context={context}
        />
      </Provider>
    ),
    initialState: store.getState()
  };
};
