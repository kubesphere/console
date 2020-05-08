/*
 * This file is part of KubeSphere Console.
 * Copyright (C) 2019 The KubeSphere Console Authors.
 *
 * KubeSphere Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * KubeSphere Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with KubeSphere Console.  If not, see <https://www.gnu.org/licenses/>.
 */

import { getIndexRoute } from 'utils/router.config'

import Layout from '../containers/layout'

import Clusters from '../containers/Clusters'
import AddCluster from '../containers/Clusters/AddCluster'
import Overview from '../containers/Overview'
import StorageClasses from '../containers/Storage/StorageClasses'
import VolumeSnapshots from '../containers/Storage/VolumeSnapshots'
import Volumes from '../containers/Storage/Volumes'
import Nodes from '../containers/Nodes'
import ServiceComponents from '../containers/ServiceComponents'
import Projects from '../containers/Projects'
import CustomResources from '../containers/CustomResources'

import Deployments from '../containers/Workload/Deployments'
import StatefulSets from '../containers/Workload/StatefulSets'
import DaemonSets from '../containers/Workload/DaemonSets'
import Jobs from '../containers/Workload/Jobs'
import CronJobs from '../containers/Workload/CronJobs'
import Pods from '../containers/Workload/Pods'
import Services from '../containers/Workload/Services'
import Routes from '../containers/Workload/Routes'
import ClusterMonitor from '../containers/Monitor/Cluster'
import ResourceMonitor from '../containers/Monitor/Resource'
import Members from '../containers/Members'
import Roles from '../containers/Roles'
import BaseInfo from '../containers/BaseInfo'
import Visibility from '../containers/Visibility'
import KubeCtl from '../containers/KubeCtl'
import KubeConfig from '../containers/KubeConfig'

import detail from './detail'

const PATH = '/clusters/:cluster'

export default [
  ...detail,
  { path: '/clusters', component: Clusters, exact: true },
  { path: '/clusters/add', component: AddCluster, exact: true },
  {
    path: `/clusters/:cluster/kubeCtl`,
    exact: true,
    component: KubeCtl,
  },
  {
    path: `/clusters/:cluster/kubeConfig`,
    component: KubeConfig,
    exact: true,
  },
  {
    path: PATH,
    component: Layout,
    routes: [
      {
        path: `${PATH}/overview`,
        component: Overview,
        exact: true,
      },
      {
        path: `${PATH}/nodes`,
        component: Nodes,
      },
      {
        path: `${PATH}/components`,
        component: ServiceComponents,
      },
      {
        path: `${PATH}/projects`,
        component: Projects,
        exact: true,
      },
      {
        path: `${PATH}/customresources`,
        component: CustomResources,
        exact: true,
      },
      {
        path: `${PATH}/deployments`,
        component: Deployments,
        exact: true,
      },
      {
        path: `${PATH}/statefulsets`,
        component: StatefulSets,
        exact: true,
      },
      {
        path: `${PATH}/daemonsets`,
        component: DaemonSets,
        exact: true,
      },
      {
        path: `${PATH}/jobs`,
        component: Jobs,
        exact: true,
      },
      {
        path: `${PATH}/cronjobs`,
        component: CronJobs,
        exact: true,
      },
      {
        path: `${PATH}/pods`,
        component: Pods,
        exact: true,
      },
      {
        path: `${PATH}/services`,
        component: Services,
        exact: true,
      },
      {
        path: `${PATH}/ingresses`,
        component: Routes,
        exact: true,
      },
      {
        path: `${PATH}/storageclasses`,
        component: StorageClasses,
        exact: true,
      },
      {
        path: `${PATH}/volumes`,
        component: Volumes,
        exact: true,
      },
      {
        path: `${PATH}/volume-snapshots`,
        component: VolumeSnapshots,
        exact: true,
      },
      {
        path: `${PATH}/monitor-cluster`,
        component: ClusterMonitor,
      },
      {
        path: `${PATH}/monitor-resource`,
        component: ResourceMonitor,
      },
      {
        path: `${PATH}/base-info`,
        component: BaseInfo,
        exact: true,
      },
      {
        path: `${PATH}/visibility`,
        component: Visibility,
        exact: true,
      },
      {
        path: `${PATH}/members`,
        component: Members,
        exact: true,
      },
      {
        path: `${PATH}/roles`,
        component: Roles,
        exact: true,
      },
      {
        path: `${PATH}/storageclasses`,
        component: StorageClasses,
        exact: true,
      },
      {
        path: `${PATH}/snapshots/:namespace?`,
        component: VolumeSnapshots,
      },
      getIndexRoute({ path: PATH, to: `${PATH}/overview`, exact: true }),
      getIndexRoute({
        path: `${PATH}/workloads`,
        to: `${PATH}/deployments`,
        exact: true,
      }),
    ],
  },
]
