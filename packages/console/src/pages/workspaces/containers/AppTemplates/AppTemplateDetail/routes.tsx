/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Navigate } from 'react-router-dom';

import { AuditRecords, InstanceList } from '@ks-console/shared';

import VersionListDetail from './VersionListDetail';

import AppTemplateDetail from './index';

const PATH = '/workspaces/:workspace/apps/:appId';

export default [
  {
    path: PATH,
    element: <AppTemplateDetail />,
    children: [
      {
        index: true,
        element: <Navigate to="versions" replace />,
      },
      {
        path: 'versions',
        element: <VersionListDetail />,
      },
      {
        path: 'audit-records',
        element: <AuditRecords />,
      },
      {
        path: 'app-instances',
        element: <InstanceList />,
      },
    ],
  },
];
