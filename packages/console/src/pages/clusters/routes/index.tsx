/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
// import { alertingDetailRoutes, alertingListRoutes } from '../containers/Alerting/routes';
import BaseLayout from '../containers/Base/BaseLayout';
import ListLayout from '../containers/Base/ListLayout';
// import projectList from '../../workspaces/containers/Members/Detail/ProjectList';
import Clusters from '../containers/Clusters/Embed';
import {
  clusterSettingDetailRoutes,
  clusterSettingListRoutes,
} from '../containers/ClusterSetting/routes';
import { configDetailRoutes, configListRoutes } from '../containers/Configuration/routes';
import CustomResources from '../containers/CustomResources';
import CustomResourcesDetail from '../containers/CustomResources/Detail';
import ResourceStatus from '../containers/CustomResources/Detail/ResourceStatus';

import KubeConfig from '../containers/KubeConfig';
// import MonitorRoutes from '../containers/Monitor/routes';

// import { networkDetailRoutes, networkListRoutes } from '../containers/Network/routes';
import Nodes from '../containers/Nodes';
import NodesDetailRoutes from '../containers/Nodes/Detail/routes';
// import EdgeNodes from '../containers/KubeEdge/index';
// import EdgeNodesRoutes from '../containers/KubeEdge/Detail/routes';
import Overview from '../containers/Overview/';
import { projectDetailRoutes, projectListRoutes } from '../containers/Projects/routes';
import { storageDetailRoutes, storageListRoutes } from '../containers/Storage/routes';

// import CronJobsDetail from '../containers/Workload/CronJobs/Detail/routes';
// import DaemonSets from '../containers/Workload/DaemonSets/Embed';

// import Projects from '../containers/Projects.new';
// import Deployment from '../containers/Workload/Deployments/Embed';
// import JobsDetail from '../containers/Workload/Jobs/Detail/routes';
import PodDetail from '../containers/Workload/Pods/Detail/routes';

import Pods from '../containers/Workload/Pods/Embed';

import ApplicationWorkloadRoutes, {
  ApplicationWorkloadDetailRoutes,
} from '../containers/ApplicationWorkloads/routes';

// import ServicesDetail from '../containers/Workload/Services/Detail/routes';

import IngressDetail from '../containers/Workload/Routes/Detail/routes';
import ClusterTags from '../containers/Clusters/ClusterTags/Embed';
// import StatefulSet from '../containers/Workload/StatefulSets/Embed';

const PATH = '/clusters/:cluster';
const routes: RouteObject[] = [
  {
    path: '/clusters',
    element: <Clusters />,
  },
  {
    path: '/clusters/tags',
    element: <ClusterTags />,
  },
  {
    path: PATH,
    element: <BaseLayout />,
    children: [
      {
        element: <ListLayout />,
        children: [
          {
            path: `${PATH}/overview`,
            element: <Overview />,
          },
          {
            path: `${PATH}/nodes`,
            element: <Nodes />,
          },
          /* {
            path: `${PATH}/edgenodes`,
            element: <EdgeNodes />,
          }, */
          {
            path: `${PATH}/customresources`,
            element: <CustomResources />,
          },
          // {
          //   path: `${PATH}/projects`,
          //   element: <Projects />,
          // },
          // {
          //   path: `${PATH}/components`,
          //   element: <SystemComponents />,
          // },
          // ...WorkloadRoutes,
          {
            path: `${PATH}/workloads`,
            element: <Navigate to={'../deployments'} replace />,
          },
          ...ApplicationWorkloadRoutes(PATH),
          {
            path: `${PATH}/pods`,
            element: <Pods />,
          },
          // ...networkListRoutes,
          ...configListRoutes,
          ...storageListRoutes,
          // ...MonitorRoutes,
          ...clusterSettingListRoutes,
          // ...alertingListRoutes,
          ...projectListRoutes,
        ],
      },
      {
        path: `${PATH}/kubeConfig`,
        element: <KubeConfig />,
      },
      // detail page routes begin
      {
        path: `${PATH}/customresources/:name`,
        element: <CustomResourcesDetail />,
        children: [
          {
            index: true,
            element: <Navigate to="resources" replace />,
          },
          {
            path: 'resources',
            element: <ResourceStatus />,
          },
        ],
      },
      // {
      //   path: `${PATH}/components/:namespace/:name`,
      //   element: <SystemComponentDetail />,
      //   children: [
      //     {
      //       index: true,
      //       element: <Navigate to="service-details" replace />,
      //     },
      //     {
      //       path: 'service-details',
      //       element: <SystemComponentDetailTab />,
      //     },
      //   ],
      // },

      // {
      //   path: `${PATH}/projects/:namespace/services/:name/`,
      //   element: <ServiceDetailPage />,
      //   children: [
      //     { index: true, element: <Navigate to="resource-status" replace /> },
      //     { path: 'resource-status', element: <ServiceDetailPage /> },
      //     { path: 'metadata', element: <ServiceDetailPage /> },
      //     { path: 'events', element: <ServiceDetailPage /> },
      //   ],
      // },
      ...projectDetailRoutes,
      ...NodesDetailRoutes,
      // ...networkDetailRoutes,
      ...configDetailRoutes,
      ...storageDetailRoutes,
      ...clusterSettingDetailRoutes,
      ...ApplicationWorkloadDetailRoutes(PATH),
      ...PodDetail,
      ...IngressDetail,
      // ...alertingDetailRoutes,
      // ...EdgeNodesRoutes,
    ],
  },
];

export default routes;
