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

import NodeDetail from '../containers/Nodes/Detail'
import ProjectDetail from '../containers/Projects/Detail'
import DeploymentDetail from '../containers/Workload/Deployments/Detail'
import StatefulSetDetail from '../containers/Workload/StatefulSets/Detail'
import DaemonSetDetail from '../containers/Workload/DaemonSets/Detail'
import JobDetail from '../containers/Workload/Jobs/Detail'
import CronJobDetail from '../containers/Workload/CronJobs/Detail'
import ServiceDetail from '../containers/Workload/Services/Detail'
import RouteDetail from '../containers/Workload/Routes/Detail'
import PodDetail from '../containers/Workload/Pods/Detail'
import ContainerDetail from '../containers/Workload/Containers/Detail'
import StorageClassDetail from '../containers/Storage/StorageClasses/Detail'
import VolumeSnapshotsDetail from '../containers/Storage/VolumeSnapshots/Detail'
import Volume from '../containers/Storage/Volumes/Detail'

const PATH = '/clusters/:cluster'

export default [
  {
    path: `${PATH}/nodes/:node`,
    component: NodeDetail,
  },
  {
    path: `${PATH}/projects/:namespace`,
    component: ProjectDetail,
  },
  {
    path: `${PATH}/namespaces/:namespace/deployments/:name`,
    component: DeploymentDetail,
  },
  {
    path: `${PATH}/namespaces/:namespace/statefulsets/:name`,
    component: StatefulSetDetail,
  },
  {
    path: `${PATH}/namespaces/:namespace/daemonsets/:name`,
    component: DaemonSetDetail,
  },
  {
    path: `${PATH}/namespaces/:namespace/jobs/:name`,
    component: JobDetail,
  },
  {
    path: `${PATH}/namespaces/:namespace/cronjobs/:name`,
    component: CronJobDetail,
  },
  {
    path: `${PATH}/namespaces/:namespace/services/:name`,
    component: ServiceDetail,
  },
  {
    path: `${PATH}/namespaces/:namespace/routes/:name`,
    component: RouteDetail,
  },
  {
    path: `${PATH}/namespaces/:namespace/pods/:podName/containers/:containerName`,
    component: ContainerDetail,
  },
  {
    path: `${PATH}/namespaces/:namespace/pods/:podName`,
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
    path: `${PATH}/namespaces/:namespace/volumes/:name`,
    component: Volume,
  },
]
