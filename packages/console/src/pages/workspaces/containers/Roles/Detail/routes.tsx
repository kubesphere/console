import React from 'react';
import { Navigate } from 'react-router-dom';

import { AuthorizationList, AuthorizedUsers } from '@ks-console/shared';

import RoleDetail from './index';

export default [
  {
    path: '/workspaces/:workspace/roles/:name',
    element: <RoleDetail />,
    children: [
      {
        index: true,
        element: <Navigate to="authorizations" replace />,
      },
      {
        path: 'authorizations',
        element: <AuthorizationList module="workspace" />,
      },
      {
        path: 'users',
        element: <AuthorizedUsers roleKey="workspacerole" />,
      },
    ],
  },
];
