/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Navigate } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import EmbedDetail from './Embed';

const PATH = '/settings/silent-policy';
const routes: RouteObject[] = [
  {
    path: `${PATH}/:name`,
    element: <EmbedDetail />,
    children: [
      {
        index: true,
        element: <Navigate to="role" replace />,
      },
      {
        path: 'role',
        element: <></>,
      },
      {
        path: 'condition',
        element: <></>,
      },
    ],
  },
];

export default routes;
