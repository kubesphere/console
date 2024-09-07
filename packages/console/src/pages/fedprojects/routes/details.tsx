/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Navigate } from 'react-router-dom';

import RouteDetail from '../containers/Routes/Detail';
import VolumeDetail from '../containers/Volumes/Detail';
import SecretDetail from '../containers/Secrets/Detail';
import GatewayDetail from '../containers/Gateway/Detail';
import ServiceDetail from '../containers/Services/Detail';
import ConfigMapDetail from '../containers/ConfigMaps/Detail';
import DeploymentDetail from '../containers/Deployments/Detail';
import ApplicatoinDetail from '../containers/Application/Detail';
import StatefulSetDetail from '../containers/StatefulSets/Detail';

export default (PATH: any) => [
  {
    path: `${PATH}/deployments/:name`,
    element: <DeploymentDetail />,
    children: [
      {
        path: 'resource-status',
        element: <></>,
      },
      {
        path: 'metadata',
        element: <></>,
      },
      {
        path: 'monitors',
        element: <></>,
      },
      {
        path: 'events',
        element: <></>,
      },
    ],
  },
  {
    path: `${PATH}/statefulsets/:name`,
    element: <StatefulSetDetail />,
    children: [
      {
        path: 'resource-status',
        element: <></>,
      },
      {
        path: 'metadata',
        element: <></>,
      },
      {
        path: 'monitors',
        element: <></>,
      },
      {
        path: 'events',
        element: <></>,
      },
    ],
  },
  {
    path: `${PATH}/services/:name`,
    element: <ServiceDetail />,
    children: [
      {
        path: 'resource-status',
        element: <></>,
      },

      {
        path: 'access',
        element: <></>,
      },

      {
        path: 'metadata',
        element: <></>,
      },
      {
        path: 'events',
        element: <></>,
      },
    ],
  },
  {
    path: `${PATH}/ingresses/:name`,
    element: <RouteDetail />,
    children: [
      {
        path: 'resource-status',
        element: <></>,
      },
      {
        path: 'metadata',
        element: <></>,
      },
      {
        path: 'events',
        element: <></>,
      },
    ],
  },
  {
    path: `${PATH}/volumes/:name`,
    element: <VolumeDetail />,
    children: [
      {
        index: true,
        element: <Navigate to="resource-status" replace />,
      },
      {
        path: 'resource-status',
        element: <></>,
      },
      {
        path: 'volume-mounts',
        element: <></>,
      },
      {
        path: 'metadata',
        element: <></>,
      },
      {
        path: 'events',
        element: <></>,
      },
    ],
  },
  {
    path: `${PATH}/secrets/:name`,
    element: <SecretDetail />,
    children: [
      {
        path: 'detail',
        element: <></>,
      },
    ],
  },
  {
    path: `${PATH}/configmaps/:name`,
    element: <ConfigMapDetail />,
    children: [
      {
        path: 'detail',
        element: <></>,
      },
    ],
  },
  {
    path: `${PATH}/applications/:name`,
    element: <ApplicatoinDetail />,
    children: [
      {
        path: 'components',
        element: <></>,
      },
      {
        path: 'ingresses',
        element: <></>,
      },
      {
        path: 'traffic',
        element: <></>,
      },
      {
        path: 'tracing',
        element: <></>,
      },
    ],
  },
  {
    path: `${PATH}/gateways/:gatewayName`,
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
];
