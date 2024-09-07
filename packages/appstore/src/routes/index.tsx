/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import {
  WorkspaceLayout,
  RepoManage,
  AppDeployDetailRoute,
  ProjectLayout,
  WorkspaceListLayout,
  ProjectListLayout,
} from '@ks-console/shared';

import BaseLayout from '../containers/Base/BaseLayout';

import AppDeploy from '../containers/AppDeploy';
import AppDetails from '../containers/AppDetails';
import AppsDashBoard from '../containers/AppsDashBoard';
import AppDeployManage from '../containers/AppDeployManage';
export default [
  {
    path: '/apps',
    element: <BaseLayout />,
    children: [
      { index: true, element: <AppsDashBoard /> },
      { path: '/apps/:appName', element: <AppDetails /> },
      { path: '/apps/:appName/deploy', element: <AppDeploy /> },
    ],
  },
  {
    path: '/',
    element: <WorkspaceLayout />,
    children: [
      {
        element: <WorkspaceListLayout />,
        children: [{ path: 'workspaces/:workspace/app-repos', element: <RepoManage /> }],
      },
    ],
  },
  {
    path: '/',
    element: <ProjectLayout />,
    children: [
      {
        element: <ProjectListLayout />,
        children: [
          {
            path: ':workspace/clusters/:cluster/projects/:namespace/deploy',
            exact: true,
            element: <AppDeployManage />,
          },
        ],
      },
      ...AppDeployDetailRoute(':workspace/clusters/:cluster/projects/:namespace/deploy'),
    ],
  },
];
