import React from 'react';
import { Navigate } from 'react-router-dom';
import ProjectsList from './ProjectList';

import MemberDetail from './index';

export default [
  {
    path: '/workspaces/:workspace/members/:name',
    element: <MemberDetail />,
    children: [
      {
        index: true,
        element: <Navigate to="projects" replace />,
      },
      {
        path: 'projects',
        element: <ProjectsList key="projects" type="projects" />,
      },
      {
        path: 'devops',
        element: <ProjectsList key="devops" type="devops" />,
        ksModule: 'devops',
      },
    ],
  },
];
