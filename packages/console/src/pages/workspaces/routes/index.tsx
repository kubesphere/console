/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Navigate } from 'react-router-dom';

import { BaseLayout, ListLayout } from '../containers/Base';

import Overview from '../containers/Overview';
// import Devops from '../containers/Devops';
import BaseInfo from '../containers/BaseInfo';
import QuotaManage from '../containers/QuotaManage';
// import Groups from '../containers/Groups';
import Roles from '../containers/Roles';
import Members from '../containers/Members';
import memberDetailRoutes from '../containers/Members/Detail/routes';
import roleDetailRoutes from '../containers/Roles/Detail/routes';
import Projects from '../containers/Projects';
// import FedProjects from '../containers/FedProjects';
import Repos from '../containers/Repos';
import AppTemplate from '../containers/AppTemplates';
import repoDetailRoutes from '../containers/Repos/RepoDetail/routes';
// import Gateway from '../containers/Gateway';
// import GatewayDetail from '../containers/Gateway/Detail/routes';
// import appTemplateDetailRoutes from '../containers/AppTemplates/AppTemplateDetail/routes';

const PATH = '/workspaces/:workspace';

export default [
  {
    path: PATH,
    element: <BaseLayout />,
    children: [
      {
        element: <ListLayout />,
        children: [
          {
            index: true,
            element: <ListLayout.IndexChild />,
          },
          {
            path: 'overview',
            element: <Navigate to="usage" replace />,
          },
          {
            path: 'overview/:tab',
            element: <Overview />,
          },
          {
            path: 'projects',
            element: <Projects />,
          },
          /* {
            path: 'federatedprojects',
            element: <FedProjects />,
          }, */
          /* {
            path: 'devops',
            element: <Devops />,
          }, */
          {
            path: 'apps',
            element: <AppTemplate />,
          },
          {
            path: 'repos',
            element: <Repos />,
          },
          {
            path: 'base-info',
            element: <BaseInfo />,
          },
          {
            path: 'quota',
            element: <QuotaManage />,
          },
          // {
          //   path: 'groups',
          //   element: <Groups />,
          // },
          {
            path: 'roles',
            element: <Roles />,
          },
          {
            path: 'members',
            element: <Members />,
          },
          // {
          //   path: `gateways`,
          //   children: [
          //     {
          //       index: true,
          //       element: <Navigate to="workspace" replace />,
          //     },
          //     {
          //       path: `${PATH}/gateways/:component`,
          //       element: <Gateway />,
          //     },
          //   ],
          // },
        ],
      },
      ...roleDetailRoutes,
      ...memberDetailRoutes,
      ...repoDetailRoutes,
      // ...GatewayDetail,
      // ...appTemplateDetailRoutes,
    ],
  },
];
