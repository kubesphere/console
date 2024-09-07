/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Navigate } from 'react-router-dom';

import AppConfig from './AppConfig';
import AppTemplate from './AppTemplate';
import ResourceStatus from './ResourceStatus';

import DetailInfo from './index';

export default (path: string) => [
  {
    path: `${path}/applications/:appType/:appId`,
    element: <DetailInfo />,
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
        path: 'template',
        element: <AppTemplate />,
      },
      {
        path: 'config',
        element: <AppConfig />,
      },
    ],
  },
];
