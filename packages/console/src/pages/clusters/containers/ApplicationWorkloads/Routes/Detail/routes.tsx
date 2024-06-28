import React from 'react';
import { Navigate } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';

import RoutesDetailPage from './Embed';

const routes = (PATH: string): RouteObject[] => [
  {
    path: `${PATH}/projects/:namespace/ingresses/:name`,
    element: <RoutesDetailPage />,
    children: [
      {
        index: true,
        element: <Navigate to="resource-status" replace />,
      },
      {
        path: `resource-status`,
        element: <></>,
      },
      {
        path: `metadata`,

        element: <></>,
      },
      {
        path: `events`,
        element: <></>,
      },
    ],
  },
];

export default routes;
