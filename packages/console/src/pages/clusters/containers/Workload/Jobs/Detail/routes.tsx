/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Navigate } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import JobDetail from './index';
import ExecuteRecords from './ExecuteRecords';
import ResourceStatus from './ResourceStatus';
import Metadata from './Metadata';
import Env from './EnvVariables';
import Events from './Events';

const PATH = '/clusters/:cluster';
const routes: RouteObject[] = [
  {
    path: `${PATH}/projects/:namespace/jobs/:name`,
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
        path: 'resource-status',
        element: <ResourceStatus />,
      },
      {
        path: 'metadata',
        element: <Metadata />,
      },
      {
        path: 'env',
        element: <Env />,
      },
      {
        path: 'events',
        element: <Events />,
      },
    ],
  },
];

export default routes;
