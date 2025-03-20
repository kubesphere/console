/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { Loading } from '@kubed/components';
import { default as React, useEffect } from 'react';
import type { RouteObject } from 'react-router-dom';
import { Navigate, useRoutes } from 'react-router-dom';
import { create } from 'zustand';

import BaseLayout from './components/Layouts/BaseLayout';
import { sessionRoutes } from './containers/Session/routes';
import { errorRoutes } from './containers/Errors/routes';
import extensionsRoutes from './containers/Extensions/routes';
import marketplaceRoutes from './containers/Marketplace/routes';
import { routes as supportRoutes } from './containers/Support';
import { registerRemoteExtensions } from './utils/extensions.remote';

const baseRoutes: RouteObject[] = [...sessionRoutes];

const homePage = globals.config.homePage || '/dashboard';

const useRouterStore = create<{
  data: { hasInit: Boolean; routes: RouteObject[] };
  setRoutes: (routes: RouteObject[]) => void;
}>(set => ({
  data: {
    hasInit: false,
    routes: baseRoutes,
  },
  setRoutes: routes => {
    set({ data: { hasInit: true, routes } });
  },
}));

function Pages() {
  const setRoutes = useRouterStore(state => state.setRoutes);
  useEffect(() => {
    registerRemoteExtensions()?.finally(() => {
      const pages = {
        path: '/',
        element: <BaseLayout />,
        children: [
          ...globals.context.routes,
          ...extensionsRoutes,
          ...marketplaceRoutes,
          ...supportRoutes,
          ...errorRoutes,
          {
            index: true,
            element: <Navigate to={homePage} replace />,
          },
        ],
      };

      const routes = [pages, ...baseRoutes];
      setRoutes(routes);
    });
  }, [setRoutes]);

  return <Loading className="page-loading" />;
}

export default function () {
  const data = useRouterStore(state => state.data);
  const router = React.useMemo(() => {
    if (!data.hasInit) {
      return [
        ...data.routes,
        {
          path: '*',
          Component: Pages,
        },
      ];
    } else {
      return data.routes;
    }
  }, [data]);
  return useRoutes(router);
}
