/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Navigate } from 'react-router-dom';

import Routes from '../containers/Routes';
import Gateway from '../containers/Gateway';
import Secrets from '../containers/Secrets';
import Volumes from '../containers/Volumes';
import BaseInfo from '../containers/BaseInfo';
import Overview from '../containers/Overview';
import Services from '../containers/Services';
import ConfigMaps from '../containers/ConfigMaps';
import QuotaManage from '../containers/QuotaManage';
import Deployments from '../containers/Deployments';
import Applications from '../containers/Application';
import StatefulSets from '../containers/StatefulSets';
import ListLayout from '../containers/Base/ListLayout';
import LogCollection from '../containers/LogCollection';

import detailsRoutes from './details';

const PATH = '/:workspace/federatedprojects/:namespace';

export default [
  ...detailsRoutes(PATH),
  {
    path: PATH,
    element: <ListLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="overview" replace />,
      },
      {
        path: `${PATH}/overview`,
        element: <Overview />,
      },
      {
        path: `${PATH}/applications`,
        element: <Applications />,
      },
      {
        path: `${PATH}/services`,
        element: <Services />,
      },
      {
        path: `${PATH}/workloads`,
        element: <Navigate to={'../deployments'} replace />,
      },
      {
        path: `${PATH}/deployments`,
        element: <Deployments />,
      },
      {
        path: `${PATH}/statefulsets`,
        element: <StatefulSets />,
      },
      {
        path: `${PATH}/ingresses`,
        element: <Routes />,
      },
      {
        path: `${PATH}/volumes`,
        element: <Volumes />,
      },
      {
        path: `${PATH}/base-info`,
        element: <BaseInfo />,
      },
      {
        path: `${PATH}/configmaps`,
        element: <ConfigMaps />,
      },
      {
        path: `${PATH}/secrets`,
        element: <Secrets />,
      },
      {
        path: `${PATH}/quota`,
        element: <QuotaManage />,
      },
      {
        path: `${PATH}/gateways`,
        element: <Gateway />,
      },
      {
        path: `${PATH}/log-collections`,
        element: <LogCollection />,
      },
    ],
  },
];
