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

import { getChildRoutes } from 'utils/router.config'

import ClusterLayout from 'clusters/containers/MonitoringCenter/Monitoring/Cluster'
import Overview from 'clusters/containers/MonitoringCenter/Monitoring/Cluster/Overview'
import PhysicalResourceMonitoring from 'clusters/containers/MonitoringCenter/Monitoring/Cluster/Monitor/PhysicalResource'
import EtcdMonitoring from 'clusters/containers/MonitoringCenter/Monitoring/Cluster/Monitor/Etcd'
import APIServerMonitoring from 'clusters/containers/MonitoringCenter/Monitoring/Cluster/Monitor/APIServer'
import SchedulerMonitoring from 'clusters/containers/MonitoringCenter/Monitoring/Cluster/Monitor/Scheduler'

import NodeUsageRanking from 'clusters/containers/MonitoringCenter/Monitoring/Cluster/Ranking'

const PATH = '/monitoring/monitor-cluster'
const ROUTES = [
  { name: 'overview', title: 'Overview', component: Overview },
  {
    name: 'resource',
    title: 'Physical Resources Monitoring',
    component: PhysicalResourceMonitoring,
  },
  {
    name: 'etcd',
    title: 'ETCD Monitoring',
    component: EtcdMonitoring,
    requireETCD: true,
  },
  {
    name: 'api-server',
    title: 'APIServer Monitoring',
    component: APIServerMonitoring,
  },
  {
    name: 'scheduler',
    title: 'Scheduler Monitoring',
    component: SchedulerMonitoring,
  },
  { name: 'ranking', title: 'Node Usage Ranking', component: NodeUsageRanking },
]

export default [
  {
    path: PATH,
    component: ClusterLayout,
    routes: getChildRoutes(ROUTES, PATH),
  },
]
