/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Navigate } from 'react-router-dom';
import { ProjectListLayout } from '@ks-console/shared';

import Pods from '../containers/Pods';
import Jobs from '../containers/Jobs';
import Roles from '../containers/Roles';
import Routes from '../containers/Routes';
import Members from '../containers/Members';
import Gateway from '../containers/Gateway';
import Volumes from '../containers/Volumes';
import Secrets from '../containers/Secrets';
import CronJobs from '../containers/CronJobs';
import Services from '../containers/Services';
import BaseInfo from '../containers/BaseInfo';
import Overview from '../containers/Overview';
import ConfigMaps from '../containers/ConfigMaps';
import DaemonSets from '../containers/DaemonSets';
import Deployments from '../containers/Deployments';
import Applications from '../containers/Applications';
import Configurations from '../containers/SpringCloud/configurations';
import Microservices from '../containers/SpringCloud/microservices';
import MicroserviceGateways from '../containers/SpringCloud/microservicegateways';
import ServiceRouting from '../containers/SpringCloud/servicerouting';
import ApplicationComposing from '../containers/ApplicationComposing';
import StatefulSets from '../containers/StatefulSets';
import ImageBuilder from '../containers/ImageBuilder';
import BaseLayout from '../containers/Base/BaseLayout';
import LogCollection from '../containers/LogCollection';
import VolumeSnapshots from '../containers/VolumeSnapshots';
import ServiceAccounts from '../containers/ServiceAccounts';
import NetworkPolicies from '../containers/Network/Policies';
import CustomMonitoring from '../containers/CustomMonitoring';
import AlertingPolicies from '../containers/Alerting/Policies';
import AlertingMessages from '../containers/Alerting/Messages';

import { getDefaultApplicationType } from '../utils';

import detailsRoutes from './detail';
import grayReleaseRoutes from './gray-release';

const defaultAppType = getDefaultApplicationType();

export const PATH = '/:workspace/clusters/:cluster/projects/:namespace';

export default [
  {
    path: PATH,
    element: <BaseLayout />,
    children: [
      {
        element: <ProjectListLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="overview" replace />,
          },
          ...grayReleaseRoutes,
          {
            path: 'overview',
            element: <Overview />,
          },
          {
            path: 'applications',
            element: <Navigate to={`../applications/${defaultAppType}`} replace />,
          },
          {
            path: 'composing',
            element: <ApplicationComposing />,
          },
          {
            path: 'applications/:appType',
            element: <Applications />,
          },
          {
            path: `${PATH}/workloads`,
            element: <Navigate to={'../deployments'} replace />,
          },
          {
            path: 'deployments',
            element: <Deployments />,
          },
          {
            path: 'statefulsets',
            element: <StatefulSets />,
          },
          {
            path: 'daemonsets',
            element: <DaemonSets />,
          },
          {
            path: 'pods',
            element: <Pods />,
          },
          {
            path: 'jobs',
            element: <Jobs />,
          },
          {
            path: 's2ibuilders',
            element: <ImageBuilder />,
          },
          {
            path: 'cronjobs',
            element: <CronJobs />,
          },
          {
            path: 'services',
            element: <Services />,
          },
          {
            path: 'ingresses',
            element: <Routes />,
          },
          {
            path: 'volumes',
            element: <Volumes />,
          },
          {
            path: 'volume-snapshots',
            element: <VolumeSnapshots />,
          },
          {
            path: 'base-info',
            element: <BaseInfo />,
          },
          {
            path: 'networkpolicies',
            element: <NetworkPolicies />,
          },
          {
            path: 'configmaps',
            element: <ConfigMaps />,
          },
          {
            path: 'serviceaccounts',
            element: <ServiceAccounts />,
          },
          {
            path: 'secrets',
            element: <Secrets />,
          },
          {
            path: 'roles',
            element: <Roles />,
          },
          {
            path: 'members',
            element: <Members />,
          },
          {
            path: 'log-collections',
            element: <LogCollection />,
          },
          {
            path: 'gateways',
            element: <Gateway />,
          },
          {
            path: 'alert-rules',
            element: <AlertingPolicies />,
          },
          {
            path: 'alerts',
            element: <AlertingMessages />,
          },
          {
            path: 'custom-monitoring',
            element: <CustomMonitoring />,
          },
          {
            path: 'configurations',
            element: <Configurations />,
          },
          {
            path: 'microservices',
            element: <Microservices />,
          },
          {
            path: 'microservicegateways',
            element: <MicroserviceGateways />,
          },
          {
            path: 'servicerouting',
            element: <ServiceRouting />,
          },
        ],
      },
      ...detailsRoutes(PATH),
    ],
  },
];
