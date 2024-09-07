/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Navigate } from 'react-router-dom';
import { get } from 'lodash';

import ListLayout from '../containers/Base/ListLayout';
import Workspaces from '../containers/Workspaces';
import Accounts from '../containers/Accounts';
import Roles from '../containers/Roles';
import accountDetailRoutes from '../containers/Accounts/Detail/routes';
import roleDetailRoutes from '../containers/Roles/Detail/routes';

import { getAccessNavs } from '../utils/navs';

const navs = getAccessNavs();
const indexPath = get(navs, '[0].children[0].name');

export default [
  {
    path: '/access',
    children: [
      {
        element: <ListLayout />,
        children: [
          {
            index: true,
            element: <Navigate to={indexPath} replace />,
          },
          {
            path: 'accounts',
            element: <Accounts />,
          },
          {
            path: 'roles',
            element: <Roles />,
          },
        ],
      },
      {
        path: '/access/workspaces',
        element: <Workspaces />,
      },
      ...accountDetailRoutes,
      ...roleDetailRoutes,
    ],
  },
];
