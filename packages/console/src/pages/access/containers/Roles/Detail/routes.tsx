/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Navigate } from 'react-router-dom';

import { AuthorizationList, AuthorizedUsers } from '@ks-console/shared';

import RoleDetail from './index';

export default [
  {
    path: '/access/roles/:name',
    element: <RoleDetail />,
    children: [
      {
        index: true,
        element: <Navigate to="authorizations" replace />,
      },
      {
        path: 'authorizations',
        element: <AuthorizationList module="global" />,
      },
      {
        path: 'users',
        element: <AuthorizedUsers roleKey="globalrole" />,
      },
    ],
  },
];
