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

import { get } from 'lodash'
import { getIndexRoute } from 'utils/router.config'

import Layout from '../../containers/MonitoringCenter/layout'

import clusterStatusRoutes from './clusterStatus'
import applicationResourceRoutes from './applicationResource'
import alertingRoutes from './alerting'
import alertingMessageRoutes from './alerting/message'
import alertingPolicyRoutes from './alerting/policy'

const PATH = '/monitoring'
const navs = globals.app.getMonitoringNavs()
const indexRoute = get(navs, '[0].items[0].name', 'nodes')

export default [
  ...alertingMessageRoutes,
  ...alertingPolicyRoutes,
  {
    path: PATH,
    component: Layout,
    routes: [
      ...clusterStatusRoutes,
      ...applicationResourceRoutes,
      ...alertingRoutes,
      getIndexRoute({ path: PATH, to: `${PATH}/${indexRoute}`, exact: true }),
      getIndexRoute({ path: '*', to: '/404', exact: true }),
    ],
  },
]
