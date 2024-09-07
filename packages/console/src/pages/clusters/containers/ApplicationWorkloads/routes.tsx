/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { RouteObject, Navigate } from 'react-router-dom';

// import Workloads from './Workloads/index';
// import Jobs from './Jobs/Job';
// import CronJobs from './Jobs/CronJob';
// import Ingress from './Routes/index';
// import Services from './Services';

import DeploymentDetail from '../../../projects/containers/ApplicationWorkloads/Workloads/Deployments/Detail/routes';
import DaemonSetDetail from '../../../projects/containers/ApplicationWorkloads/Workloads/DaemonSets/Detail/routes';
import StatefulSetDetail from '../../../projects/containers/ApplicationWorkloads/Workloads/StatefulSets/Detail/routes';
import JobDetail from '../../../projects/containers/ApplicationWorkloads/Jobs/Job/Detail/routes';
import CronJobDetail from '../../../projects/containers/ApplicationWorkloads/Jobs/CronJob/Detail/routes';

import ServiceDetail from './Services/Detail/routes';
import RoutesDetail from './Routes/Detail/routes';

// embed
import WorkLoadList from '../Workload/Workloads';
import Job from './Jobs/Embed';
import Services from './Services/Embed';
import Ingress from './Routes/Embed';
import IngressSetting from './RoutersSetting/Embed';

const ApplicationWorkloadRoutes = (PATH: string): RouteObject[] => [
  {
    path: `${PATH}/workloads`,
    element: <Navigate to={'../deployments'} replace />,
  },
  {
    path: `${PATH}/deployments`,
    // element: <Workloads module="deployments" />,
    element: <WorkLoadList tab="deployments" />,
  },
  {
    path: `${PATH}/statefulsets`,
    // element: <Workloads module="statefulsets" />,
    element: <WorkLoadList tab="statefulsets" />,
  },
  {
    path: `${PATH}/daemonsets`,
    // element: <Workloads module="daemonsets" />,
    element: <WorkLoadList tab="daemonsets" />,
  },
  {
    path: `${PATH}/jobs`,
    element: <Job tab="jobs" />,
  },
  {
    path: `${PATH}/cronjobs`,
    element: <Job tab="cronjobs" />,
  },
  {
    path: `${PATH}/services`,
    element: <Services />,
  },
  {
    path: `${PATH}/ingresses`,
    element: <Ingress />,
  },
  {
    path: `${PATH}/clusteringresssettings`,
    element: <IngressSetting />,
  },
];

export const ApplicationWorkloadDetailRoutes = (PATH: string): RouteObject[] => [
  ...DeploymentDetail(PATH),
  ...DaemonSetDetail(PATH),
  ...StatefulSetDetail(PATH),
  ...JobDetail(PATH),
  ...CronJobDetail(PATH),
  ...ServiceDetail(PATH),
  ...RoutesDetail(PATH),
];

export default ApplicationWorkloadRoutes;
