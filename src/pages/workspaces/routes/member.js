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

import Detail from '../containers/Members/Detail'
import Projects from '../containers/Members/Detail/Projects'
import DevOps from '../containers/Members/Detail/DevOps'

const PATH = '/workspaces/:workspace/members/:member'

const ROUTES = [
  {
    name: 'projects',
    path: `${PATH}/projects`,
    title: 'Projects',
    component: Projects,
  },
  {
    name: 'devops',
    path: `${PATH}/devops`,
    title: 'DevOps Projects',
    component: DevOps,
    ksModule: 'devops',
  },
]

export default [
  {
    path: PATH,
    component: withProps(DetailLayout, {
      module: 'users',
      component: Detail,
      breadcrumbs: [
        { label: 'Workspace', url: '/workspaces/:workspace' },
        { label: 'Members', url: '/workspaces/:workspace/members' },
      ],
    }),
    routes: getChildRoutes(ROUTES, PATH),
  },
]
