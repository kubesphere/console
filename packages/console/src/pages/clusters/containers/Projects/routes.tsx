/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import ProjectDetailPage from './detail';
import ProjectGatewayEmbed from './detail/Gateway/Embed';
import ProjectMetadata from './detail/Metadata';
import ProjectPods from './detail/Pods';
import ProjectQuota from './detail/Quota';
import ProjectResourceStatus from './detail/ResourceStatus';
import { PROJECTS_SYSTEM_KEY, PROJECTS_USER_KEY } from './constants';
import Projects from './index';
import { ModalProvider, ModalProviderLayout } from '../../../../components/useModal/ModalProvider';

const PATH = '/clusters/:cluster';

export const projectListRoutes: RouteObject[] = [
  {
    path: `${PATH}/projects`,
    element: <ModalProviderLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={'./user'} replace />,
      },
      {
        path: `user`,
        element: <Projects type={PROJECTS_USER_KEY} />,
      },
      {
        path: `system`,
        element: <Projects type={PROJECTS_SYSTEM_KEY} />,
      },
    ],
  },
];

export const projectDetailRoutes: RouteObject[] = [
  {
    path: `${PATH}/projects/:namespace`,
    element: (
      <ModalProvider>
        <ProjectDetailPage />
      </ModalProvider>
    ),
    children: [
      { index: true, element: <Navigate to="overview" replace /> },
      {
        path: 'overview',
        element: <ProjectResourceStatus />,
      },
      {
        path: 'pods',
        element: <ProjectPods />,
      },
      {
        path: 'gateway',
        element: <ProjectGatewayEmbed />,
      },
      {
        path: 'quota',
        element: <ProjectQuota />,
      },
      {
        path: 'metadata',
        element: <ProjectMetadata />,
      },
    ],
  },
];
