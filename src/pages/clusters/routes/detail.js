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

import DeploymentDetail from 'projects/containers/Deployments/Detail'
import StatefulSetDetail from 'projects/containers/StatefulSets/Detail'
import DaemonSetDetail from 'projects/containers/DaemonSets/Detail'
import JobDetail from 'projects/containers/Jobs/Detail'
import CronJobDetail from 'projects/containers/CronJobs/Detail'
import ServiceDetail from 'projects/containers/Services/Detail'
import RouteDetail from 'projects/containers/Routes/Detail'
import PodDetail from 'projects/containers/Pods/Detail'
import ContainerDetail from 'projects/containers/Pods/Containers/Detail'

import NodeDetail from '../containers/Nodes/Detail'
import ProjectDetail from '../containers/Projects/Detail'
import StorageClassDetail from '../containers/Storage/StorageClasses/Detail'
import VolumeSnapshotsDetail from '../containers/Storage/VolumeSnapshots/Detail'
import Volume from '../containers/Storage/Volumes/Detail'
import ComponentDetail from '../containers/ServiceComponents/Detail'

const PATH = '/clusters/:cluster'

export default [
  {
    path: `${PATH}/nodes/:node`,
    component: NodeDetail,
  },
  {
    path: `${PATH}/components/:namespace/:name`,
    component: ComponentDetail,
  },
  {
    path: `${PATH}/components/:namespace/:name/pods/:podName/containers/:containerName`,
    component: ContainerDetail,
  },
  {
    path: `${PATH}/components/:namespace/:name/pods/:podName`,
    component: PodDetail,
  },
  {
    path: `${PATH}/projects/:namespace/:module/:name/pods/:podName/containers/:containerName`,
    component: ContainerDetail,
  },
  {
    path: `${PATH}/projects/:namespace/:module/:name/pods/:podName`,
    component: PodDetail,
  },
  {
    path: `${PATH}/projects/:namespace/deployments/:name`,
    component: DeploymentDetail,
  },
  {
    path: `${PATH}/projects/:namespace/statefulsets/:name`,
    component: StatefulSetDetail,
  },
  {
    path: `${PATH}/projects/:namespace/daemonsets/:name`,
    component: DaemonSetDetail,
  },
  {
    path: `${PATH}/projects/:namespace/jobs/:name`,
    component: JobDetail,
  },
  {
    path: `${PATH}/projects/:namespace/cronjobs/:name`,
    component: CronJobDetail,
  },
  {
    path: `${PATH}/projects/:namespace/services/:name`,
    component: ServiceDetail,
  },
  {
    path: `${PATH}/projects/:namespace/ingresses/:name`,
    component: RouteDetail,
  },
  {
    path: `${PATH}/projects/:namespace/pods/:podName/containers/:containerName`,
    component: ContainerDetail,
  },
  {
    path: `${PATH}/projects/:namespace/pods/:podName`,
    component: PodDetail,
  },
  {
    path: `${PATH}/storageclasses/:name`,
    component: StorageClassDetail,
  },
  {
    path: `${PATH}/snapshots/:namespace/:name`,
    component: VolumeSnapshotsDetail,
  },
  {
    path: `${PATH}/projects/:namespace/volumes/:name`,
    component: Volume,
  },
  {
    path: `${PATH}/projects/:namespace`,
    component: ProjectDetail,
  },
]
