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

import Metadata from 'core/containers/Base/Detail/Metadata'
import RunningStatus from './RunningStatus'
import Pods from './Pods'
import Monitoring from './Monitoring'
import Events from './Events'

const PATH = '/clusters/:cluster/nodes/:node'

export default [
  {
    path: `${PATH}/status`,
    title: 'RUNNING_STATUS',
    component: RunningStatus,
    exact: true,
  },
  { path: `${PATH}/pods`, title: 'PODS', component: Pods, exact: true },
  {
    path: `${PATH}/metadata`,
    title: 'METADATA',
    component: Metadata,
    exact: true,
  },
  {
    path: `${PATH}/monitors`,
    title: 'MONITORING',
    component: Monitoring,
    exact: true,
  },
  { path: `${PATH}/events`, title: 'EVENT_PL', component: Events, exact: true },
  getIndexRoute({ path: PATH, to: `${PATH}/status`, exact: true }),
]
