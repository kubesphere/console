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

import ListLayout from '../containers/Base/List'

import BaseInfo from '../containers/BaseInfo'
import QuotaManage from '../containers/QuotaManage'
import Roles from '../containers/Roles'
import Members from '../containers/Members'
import Groups from '../containers/Groups'
import Projects from '../containers/Projects'
import FedProjects from '../containers/FedProjects'
import DevOps from '../containers/DevOps'
import Apps from '../containers/Apps'
import Repos from '../containers/Repos'

import detail from './detail'
import overviewRoutes from './overview'

const PATH = '/workspaces/:workspace'

export default [
  ...detail,
  {
    path: PATH,
    component: ListLayout,
    routes: [
      ...overviewRoutes,
      {
        path: `${PATH}/federatedprojects`,
        component: FedProjects,
        exact: true,
      },
      {
        path: `${PATH}/projects`,
        component: Projects,
        exact: true,
      },
      {
        path: `${PATH}/devops`,
        component: DevOps,
        exact: true,
      },
      {
        path: `${PATH}/apps`,
        component: Apps,
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
        exact: true,
      },
      {
        path: `${PATH}/quota`,
        component: QuotaManage,
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
      {
        path: `${PATH}/groups`,
        component: Groups,
        exact: true,
      },
    ],
  },
]
