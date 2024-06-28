import React from 'react';
import { Navigate } from 'react-router-dom';

import AppConfig from './AppConfig';
import AppTemplate from './AppTemplate';
import ResourceStatus from './ResourceStatus';

import DetailInfo from './index';

export default (path: string) => [
  {
    path: `${path}/:appName`,
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
