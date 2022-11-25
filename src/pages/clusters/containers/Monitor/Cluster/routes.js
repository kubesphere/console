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

import Overview from './Overview'
import PhysicalResourceMonitoring from './Monitor/PhysicalResource'
import EtcdMonitoring from './Monitor/Etcd'
import APIServerMonitoring from './Monitor/APIServer'
import SchedulerMonitoring from './Monitor/Scheduler'
import NodeUsageRanking from './Ranking'

const PATH = '/clusters/:cluster/monitor-cluster'
export default [
  {
    path: `${PATH}/overview`,
    title: 'OVERVIEW',
    component: Overview,
    exact: true,
  },
  {
    path: `${PATH}/resource`,
    title: 'PHYSICAL_RESOURCES_MONITORING',
    component: PhysicalResourceMonitoring,
    exact: true,
  },
  {
    path: `${PATH}/etcd`,
    title: 'ETCD_MONITORING',
    component: EtcdMonitoring,
    requireETCD: true,
    exact: true,
  },
  {
    path: `${PATH}/api-server`,
    title: 'API_SERVER_MONITORING',
    component: APIServerMonitoring,
    exact: true,
  },
  {
    path: `${PATH}/scheduler`,
    title: 'SCHEDULER_MONITORING',
    component: SchedulerMonitoring,
    exact: true,
  },
  {
    path: `${PATH}/ranking`,
    title: 'RESOURCE_USAGE_RANKING',
    component: NodeUsageRanking,
    exact: true,
  },
  getIndexRoute({ path: PATH, to: `${PATH}/overview`, exact: true }),
]
