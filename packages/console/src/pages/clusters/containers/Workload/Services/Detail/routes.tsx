/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Navigate } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import PodDetail from './index';
// import ResourceStatus from './ResourceStatus';
import Metadata from './Metadata';
import Events from './Events';

const PATH = '/clusters/:cluster';
const routes: RouteObject[] = [
  {
    path: `${PATH}/projects/:namespace/services/:name`,
    element: <PodDetail />,
    children: [
      {
        index: true,
        element: <Navigate to="metadata" replace />,
      },
      // {
      //   path: 'resource-status',
      //   element: <ResourceStatus />,
      // },
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
