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

import { withProps } from 'utils'
import { getChildRoutes, getIndexRoute } from 'utils/router.config'

import DetailLayout from 'core/layouts/Detail'

import { getPodRoutes } from 'projects/routes/pod'

import Detail from '../../containers/Infrastructure/Nodes/Detail'
import RunningStatus from '../../containers/Infrastructure/Nodes/Detail/RunningStatus'
import Pods from '../../containers/Infrastructure/Nodes/Detail/Pods'
import Annotations from '../../containers/Infrastructure/Nodes/Detail/Annotations'
import Monitoring from '../../containers/Infrastructure/Nodes/Detail/Monitoring'
import Events from '../../containers/Infrastructure/Nodes/Detail/Events'

const MODULE = 'nodes'
const PATH = `/infrastructure/${MODULE}/:name`
const ROUTES = [
  { name: 'status', title: 'Running Status', component: RunningStatus },
  { name: 'pods', title: 'Pods', component: Pods },
  { name: 'annotations', title: 'Annotations', component: Annotations },
  { name: 'monitors', title: 'Monitoring', component: Monitoring },
  { name: 'events', title: 'Events', component: Events },
]

const BREAD_CRUMBS = [{ label: 'Nodes', url: `/infrastructure/${MODULE}` }]

export default [
  ...getPodRoutes(`${PATH}/projects/:namespace`, [
    ...BREAD_CRUMBS,
    {
      label: 'Detail',
      url: `${PATH}/pods`,
    },
  ]),
  getIndexRoute({
    path: `${PATH}/projects/:namespace`,
    to: `${PATH}/pods`,
    exact: true,
  }),
  {
    path: PATH,
    component: withProps(DetailLayout, {
      module: MODULE,
      component: Detail,
      breadcrumbs: BREAD_CRUMBS,
    }),
    routes: getChildRoutes(ROUTES, PATH),
  },
]
