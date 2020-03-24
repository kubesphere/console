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

import Events from 'core/containers/Base/Detail/Events'
import EnvVariables from 'core/containers/Base/Detail/EnvVariables'
import ResourceStatus from 'projects/containers/Pods/Detail/ResourceStatus'
import ScheduleInfo from 'projects/containers/Pods/Detail/ScheduleInfo'
import Monitoring from 'projects/containers/Pods/Detail/Monitoring'

const PATH = '/clusters/:cluster/namespaces/:namespace/pods/:podName'

export default [
  {
    path: `${PATH}/resource-status`,
    title: 'Resource Status',
    component: ResourceStatus,
    exact: true,
  },
  {
    path: `${PATH}/schedule`,
    title: 'Schedule Info',
    component: ScheduleInfo,
  },
  {
    path: `${PATH}/monitors`,
    title: 'Monitoring',
    component: Monitoring,
    exact: true,
  },
  {
    path: `${PATH}/env`,
    title: 'Environment Variables',
    component: EnvVariables,
    exact: true,
  },
  { path: `${PATH}/events`, title: 'Events', component: Events, exact: true },
  getIndexRoute({ path: PATH, to: `${PATH}/resource-status`, exact: true }),
]
