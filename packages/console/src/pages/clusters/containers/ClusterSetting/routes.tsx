/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthorizationList, AuthorizedUsers } from '@ks-console/shared';

import BaseInfo from './BaseInfo';
import Members from './Members';
import Roles from './Roles';
import LogCollection from './LogCollection/Embed';
import Visibility from './Visibility';
import Gateway from './EmbedGateway';

import RoleDetail from './Roles/Detail';
import LogCollectionDetail from './LogCollection/Detail/Embed';
import GatewayDetail from './EmbedGateway/Detail';
const PATH = '/clusters/:cluster';

const clusterSettingListRoutes = [
  {
    path: `${PATH}/base-info`,
    element: <BaseInfo />,
  },
  {
    path: `${PATH}/members`,
    element: <Members />,
  },
  {
    path: `${PATH}/roles`,
    element: <Roles />,
  },
  {
    path: 'log-collections',
    element: <LogCollection />,
    children: [
      {
        index: true,
        element: <Navigate to="logs" replace />,
      },
      {
        path: 'logs',
        element: <LogCollection />,
      },
      {
        path: 'events',
        element: <LogCollection />,
      },
      {
        path: 'auditing',
        element: <LogCollection />,
      },
      {
        path: 'notification-history',
        element: <LogCollection />,
      },
    ],
  },
  {
    path: `${PATH}/visibility`,
    element: <Visibility />,
  },
  {
    path: `${PATH}/gateways`,
    children: [
      {
        index: true,
        element: <Navigate to="cluster" replace />,
      },
      {
        path: `${PATH}/gateways/:component`,
        element: <Gateway />,
      },
    ],
  },
];

const clusterSettingDetailRoutes = [
  {
    path: `${PATH}/roles/:name`,
    element: <RoleDetail />,
    children: [
      {
        index: true,
        element: <Navigate to="authorizations" replace />,
      },
      {
        path: 'authorizations',
        element: <AuthorizationList module="cluster" />,
      },
      {
        path: 'users',
        element: <AuthorizedUsers roleKey="clusterrole" />,
      },
    ],
  },
  {
    path: `${PATH}/gateways/:component/:gatewayName`,
    element: <GatewayDetail />,
    children: [
      {
        path: 'monitors',
        element: <></>,
      },
      {
        path: 'gateway-configs',
        element: <></>,
      },
      {
        path: 'logs',
        element: <></>,
      },
      {
        path: 'resource-status',
        element: <></>,
      },
      {
        path: 'metadata',
        element: <></>,
      },
    ],
  },
  {
    path: `${PATH}/log-collections/:component/:name`,
    element: <LogCollectionDetail />,
    children: [
      {
        index: true,
        element: <Navigate to="resource-status" replace />,
      },
      {
        path: 'resource-status',
        element: <LogCollectionDetail />,
      },
    ],
  },
];

export { clusterSettingListRoutes, clusterSettingDetailRoutes };
