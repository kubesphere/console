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

import Layout from '../containers/layout'

import BaseInfo from '../containers/BaseInfo'
import Roles from '../containers/Roles'
import Members from '../containers/Members'
import Projects from '../containers/Projects'
import DevOps from '../containers/DevOps'
import Apps from '../containers/Apps'
import Repos from '../containers/Repos'

import detail from './detail'
import overviewRoutes from './overview'
import appRoutes from './app'

const PATH = '/workspaces/:workspace'

export default [
  ...appRoutes,
  ...detail,
  {
    path: PATH,
    component: Layout,
    routes: [
      ...overviewRoutes,
      {
        path: `${PATH}/projects`,
        component: Projects,
        exact: true,
      },
      {
        path: `${PATH}/devops`,
        component: DevOps,
        ksModule: 'devops',
        exact: true,
      },
      {
        path: `${PATH}/apps`,
        component: Apps,
        ksModule: 'openpitrix',
        exact: true,
      },
      {
        path: `${PATH}/base-info`,
        component: BaseInfo,
        exact: true,
      },
      {
        path: `${PATH}/repos`,
        component: Repos,
        ksModule: 'openpitrix',
        exact: true,
      },
      {
        path: `${PATH}/roles`,
        component: Roles,
        exact: true,
      },
      {
        path: `${PATH}/members`,
        component: Members,
        exact: true,
      },
      getIndexRoute({ path: PATH, to: `${PATH}/overview`, exact: true }),
      getIndexRoute({ path: '*', to: '/404', exact: true }),
    ],
  },
]
