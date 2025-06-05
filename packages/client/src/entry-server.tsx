import ReactDOM from 'react-dom/server';
import { matchRoutes } from 'react-router-dom';
import { Request as ExpressRequest } from 'express';
import { Provider } from 'react-redux';
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router-dom/server';

import { routes, store } from './app';
import { createContext, createFetchRequest, createUrl } from './entry-server.utils.ts';
import { fetchUserThunk } from './entities/user';

export const render = async (req: ExpressRequest) => {
  const { query, dataRoutes } = createStaticHandler(routes);
  const fetchRequest = createFetchRequest(req);
  const context = await query(fetchRequest);

  if (context instanceof Response) {
    throw context;
  }

  await store.dispatch(fetchUserThunk());

  // const url = createUrl(req);

  // const foundRoutes = matchRoutes(routes, url);
  // if (!foundRoutes) {
  //   throw new Error('Страница не найдена!');
  // }

  // const [
  //   {
  //     route: { fetchData }
  //   }
  // ] = foundRoutes;

  // try {
  //   if (fetchData) {
  //     await fetchData({
  //       dispatch: store.dispatch,
  //       state: store.getState(),
  //       ctx: createContext(req)
  //     });
  //   }
  // } catch (e) {
  //   console.log('Инициализация страницы произошла с ошибкой', e);
  // }

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
