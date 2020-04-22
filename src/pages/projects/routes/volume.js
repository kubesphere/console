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
import { getChildRoutes } from 'utils/router.config'

import DetailLayout from 'core/layouts/Detail'

import Events from 'core/containers/Base/Detail/Events'
import Detail from '../containers/Volumes/Detail'
import ResourceStatus from '../containers/Volumes/Detail/ResourceStatus'
import Snapshots from '../containers/Volumes/Detail/Snapshots'

import { getPodRoutes } from './pod'

const PATH = '/projects/:namespace/volumes/:name'
const ROUTES = [
  {
    name: 'resource-status',
    title: 'Resource Status',
    component: ResourceStatus,
  },
  { name: 'events', title: 'Events', component: Events },
  { name: 'snapshot', title: 'Snapshots Message', component: Snapshots },
]

const BREAD_CRUMBS = [
  {
    label: 'Project',
    url: '/projects/:namespace',
  },
  {
    label: 'Volumes',
    url: '/projects/:namespace/volumes',
  },
]

export default [
  ...getPodRoutes(PATH, [
    ...BREAD_CRUMBS,
    {
      label: 'Detail',
      url: PATH,
    },
  ]),
  {
    path: PATH,
    component: withProps(DetailLayout, {
      module: 'volumes',
      component: Detail,
      breadcrumbs: BREAD_CRUMBS,
    }),
    routes: getChildRoutes(ROUTES, PATH),
  },
]
