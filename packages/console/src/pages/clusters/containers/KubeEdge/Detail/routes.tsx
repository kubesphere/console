/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Navigate } from 'react-router-dom';
import Detail from './index';
const PATH = '/clusters/:cluster';

const routes = [
  {
    path: `${PATH}/edgenodes/:name`,
    element: <Detail />,
    children: [
      {
        index: true,
        element: <Navigate to="status" replace />,
      },
      {
        path: 'status',
        element: <></>,
      },
      {
        path: 'pods',
        element: <></>,
      },
      {
        path: 'metadata',
        element: <></>,
      },
      {
        path: 'events',
        element: <></>,
      },
    ],
  },
];
export default routes;
