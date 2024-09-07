/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Navigate } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import JobDetail from './index';
import ExecuteRecords from './ExecuteRecords';
import Metadata from './Metadata';
import Events from './Events';

const routes = (PATH: string): RouteObject[] => [
  {
    path: `${PATH}/projects/:namespace/cronjobs/:name`,
    element: <JobDetail />,
    children: [
      {
        index: true,
        element: <Navigate to="records" replace />,
      },
      {
        path: 'records',
        element: <ExecuteRecords />,
      },
      {
        path: 'metadata',
        element: <Metadata />,
      },
      {
        path: 'events',
        element: <Events />,
      },
    ],
  },
];

export default routes;
