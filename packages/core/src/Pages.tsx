/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState, useEffect } from 'react';
import type { RouteObject } from 'react-router-dom';
import { useRoutes, Navigate } from 'react-router-dom';
import { Loading } from '@kubed/components';

import { registerRemoteExtensions } from './utils/extensions.remote';
import Login from './containers/Session/Login';
import LoginConfirm from './containers/Session/LoginConfirm';
import PasswordConfirm from './containers/Session/PasswordConfirm';
import BaseLayout from './components/Layouts/BaseLayout';

import extensionsRoutes from './containers/Extensions/routes';
import marketplaceRoutes from './containers/Marketplace/routes';
import { routes as supportRoutes } from './containers/Support';

const baseRoutes: RouteObject[] = [
  { path: '/login', element: <Login /> },
  { path: '/login/confirm', element: <LoginConfirm /> },
  { path: '/password/confirm', element: <PasswordConfirm /> },
];

const homePage = globals.config.homePage || '/dashboard';

function usePages() {
  const [isRemoteExtensionLoading, setIsRemoteExtensionLoading] = useState(true);

  useEffect(() => {
    setIsRemoteExtensionLoading(true);
    registerRemoteExtensions()?.finally(() => setIsRemoteExtensionLoading(false));
  }, []);

  if (isRemoteExtensionLoading) {
    return [{ path: '*', element: <Loading className="page-loading" /> }];
  }

  const pages = {
    path: '/',
    element: <BaseLayout />,
    children: [
      ...globals.context.routes,
      ...extensionsRoutes,
      ...marketplaceRoutes,
      ...supportRoutes,
      {
        index: true,
        element: <Navigate to={homePage} replace />,
      },
    ],
  };

  const routes = [pages, ...baseRoutes];

  return routes;
}

export default function Pages() {
  const routes = usePages();

  return useRoutes(routes);
}
