import React from 'react';
import { Navigate } from 'react-router-dom';

import Events from './Events';

import RepoDetail from './index';

const PATH = '/workspaces/:workspace/repos/:repoId';

export default [
  {
    path: PATH,
    element: <RepoDetail />,
    children: [
      {
        index: true,
        element: <Navigate to="events" replace />,
      },
      {
        path: 'events',
        element: <Events />,
      },
    ],
  },
];
