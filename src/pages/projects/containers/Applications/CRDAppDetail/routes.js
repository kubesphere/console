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

import Components from './Components'
import TrafficManangement from './TrafficManangement'
import GrayRelease from './GrayRelease'
import Tracing from './Tracing'

const PATH =
  '/:workspace/clusters/:cluster/projects/:namespace/applications/composing/:name'

export default [
  {
    path: `${PATH}/components`,
    title: 'Application Components',
    component: Components,
    exact: true,
  },
  {
    path: `${PATH}/traffic`,
    title: 'Traffic Management',
    component: TrafficManangement,
    clusterModule: 'servicemesh',
    exact: true,
  },
  {
    path: `${PATH}/grayrelease`,
    title: 'Grayscale Release',
    component: GrayRelease,
    clusterModule: 'servicemesh',
    exact: true,
  },
  {
    path: `${PATH}/tracing`,
    title: 'Tracing',
    component: Tracing,
    clusterModule: ['servicemesh', 'logging'],
    exact: true,
  },
  getIndexRoute({ path: PATH, to: `${PATH}/components`, exact: true }),
]
