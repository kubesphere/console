/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { Loading } from '@kubed/components';
import React from 'react';
import type { RouteObject } from 'react-router-dom';
import { Navigate, useRoutes } from 'react-router-dom';
import { create } from 'zustand';

import BaseLayout from './components/Layouts/BaseLayout';
import Login from './containers/Session/Login';
import LoginConfirm from './containers/Session/LoginConfirm';
import PasswordConfirm from './containers/Session/PasswordConfirm';
import { registerRemoteExtensions } from './utils/extensions.remote';

import extensionsRoutes from './containers/Extensions/routes';
import marketplaceRoutes from './containers/Marketplace/routes';

const baseRoutes: RouteObject[] = [
  { path: '/login', element: <Login /> },
  { path: '/login/confirm', element: <LoginConfirm /> },
  { path: '/password/confirm', element: <PasswordConfirm /> },
];

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

  React.useEffect(() => {
    registerRemoteExtensions()?.finally(() => {
      const routes = [
        ...baseRoutes,
        {
          path: '/',
          element: <BaseLayout />,
          children: [
            ...globals.context.routes,
            ...extensionsRoutes,
            ...marketplaceRoutes,
            {
              index: true,
              element: <Navigate to={homePage} replace />,
            },
          ],
        },
      ];
      setRoutes(routes);
    });
  }, [setRoutes]);

  return useRoutes([
    {
      path: '*',
      element: <Loading className="page-loading" />,
    },
  ]);
}

export default function () {
  const data = useRouterStore(state => state.data);
  const router = React.useMemo(() => {
    if (!data.hasInit) {
      return useRoutes(
        [
          ...data.routes,
          {
            path: '*',
            Component: Pages,
          },
        ],
        {},
      );
    } else {
      return useRoutes(data.routes);
    }
  }, [data]);
  return router;
}
