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

import DeploymentDetail from '../containers/Deployments/Detail'
import StatefulSetDetail from '../containers/StatefulSets/Detail'
import DaemonSetDetail from '../containers/DaemonSets/Detail'
import JobDetail from '../containers/Jobs/Detail'
import CronJobDetail from '../containers/CronJobs/Detail'
import PodDetail from '../containers/Pods/Detail'
import ContainerDetail from '../containers/Pods/Containers/Detail'
import ServiceDetail from '../containers/Services/Detail'
import RouteDetail from '../containers/Routes/Detail'
import SecretDetail from '../containers/Secrets/Detail'
import ConfigMapDetail from '../containers/ConfigMaps/Detail'
import CRDAppDetail from '../containers/Applications/CRDAppDetail'
import OPAppDetail from '../containers/Applications/OPAppDetail'

const PATH = '/cluster/:cluster/projects/:namespace'

export default [
  {
    path: `${PATH}/:module/:name/pods/:podName/containers/:containerName`,
    component: ContainerDetail,
  },
  {
    path: `${PATH}/:module/:name/pods/:podName`,
    component: PodDetail,
  },
  {
    path: `${PATH}/deployments/:name`,
    component: DeploymentDetail,
  },
  {
    path: `${PATH}/statefulsets/:name`,
    component: StatefulSetDetail,
  },
  {
    path: `${PATH}/daemonsets/:name`,
    component: DaemonSetDetail,
  },
  {
    path: `${PATH}/jobs/:name`,
    component: JobDetail,
  },
  {
    path: `${PATH}/cronjobs/:name`,
    component: CronJobDetail,
  },
  {
    path: `${PATH}/pods/:podName`,
    component: PodDetail,
  },
  {
    path: `${PATH}/pods/:podName/containers/:containerName`,
    component: ContainerDetail,
  },
  {
    path: `${PATH}/services/:name`,
    component: ServiceDetail,
  },
  {
    path: `${PATH}/routes/:name`,
    component: RouteDetail,
  },
  {
    path: `${PATH}/secrets/:name`,
    component: SecretDetail,
  },
  {
    path: `${PATH}/configmaps/:name`,
    component: ConfigMapDetail,
  },
  {
    path: `${PATH}/applications/composing/:name`,
    component: CRDAppDetail,
  },
  {
    path: `${PATH}/applications/template/:id`,
    component: OPAppDetail,
  },
]
