/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Navigate } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import DaemonSetDetail from './index';
import ResourceStatus from './ResourceStatus';
import RevisionControl from './RevisionControl';
import Metadata from './Metadata';
import Env from './EnvVariables';
import Events from './Events';

const PATH = '/clusters/:cluster';
const routes: RouteObject[] = [
  {
    path: `${PATH}/projects/:namespace/daemonsets/:name`,
    element: <DaemonSetDetail />,
    children: [
      {
        index: true,
        element: <Navigate to="resource-status" replace />,
      },
      {
        path: 'resource-status',
        element: <ResourceStatus />,
      },
      {
        path: 'revision-control',
        element: <RevisionControl />,
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
