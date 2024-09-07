/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Navigate } from 'react-router-dom';

import DeploymentDetailPage from './index';
import ResourceStatus from './ResourceStatus';
import RevisionControl from './RevisionControl';
import Metadata from './Metadata';
import EnvVariables from './EnvVariables';
import Events from './Events';
import Monitorings from './Monitoring';

const getRoutes = (PATH: string) => [
  {
    path: `${PATH}/projects/:namespace/deployments/:name`,
    element: <DeploymentDetailPage />,
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
        path: 'monitors',
        element: <Monitorings store="DeploymentDetailProps" />,
      },
      {
        path: 'env',
        element: <EnvVariables />,
      },
      {
        path: 'events',
        element: <Events />,
      },
    ],
  },
];

export default getRoutes;
