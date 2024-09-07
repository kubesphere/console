/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Navigate } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import PodDetail from './Embed';
// import ResourceStatus from './ResourceStatus';
// import RevisionControl from './RevisionControl';
import Metadata from './Metadata';
import Env from './Env';
import Events from './Events';
import ContainerDetail from '../ContainerDetail';
import containerDetailRoutes from '../ContainerDetail/routes';

const PATH = '/clusters/:cluster';
const routes: RouteObject[] = [
  {
    path: `${PATH}/projects/:namespace/pods/:name`,
    element: <PodDetail />,
    children: [
      {
        index: true,
        element: <Navigate to="metadata" replace />,
      },
      {
        path: 'resource-status',
        element: <PodDetail />,
      },
      {
        path: 'schedule',
        element: <PodDetail />,
      },
      {
        path: 'monitors',
        element: <PodDetail />,
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
  {
    path: `${PATH}/projects/:namespace/pods/:podName/containers/:containerName`,
    element: <ContainerDetail />,
    children: [...containerDetailRoutes],
  },
];

export default routes;
