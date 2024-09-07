/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Navigate } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';

import ServiceDetailPage from './Embed';

const routes = (PATH: string): RouteObject[] => [
  {
    path: `${PATH}/projects/:namespace/services/:name`,
    element: <ServiceDetailPage />,
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
