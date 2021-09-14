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

import OverviewLayout from '../containers/Overview'
import ResourceUsage from '../containers/Overview/ResourceUsage'
import UsageRanking from '../containers/Overview/UsageRanking'
import Clusters from '../containers/Overview/Clusters'

const PATH = '/workspaces/:workspace/overview'
const ROUTES = [
  { name: 'usage', title: 'RESOURCE_USAGE', component: ResourceUsage },
  { name: 'ranking', title: 'USAGE_RANKING', component: UsageRanking },
  {
    name: 'clusters',
    title: 'CLUSTER_INFORMATION',
    component: Clusters,
    multiCluster: true,
  },
]

export default [
  {
    path: PATH,
    component: OverviewLayout,
    routes: getChildRoutes(
      ROUTES.filter(item => !item.multiCluster || globals.app.isMultiCluster),
      PATH
    ),
  },
]
