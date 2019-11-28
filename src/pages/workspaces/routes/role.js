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
import { getIndexRoute } from 'utils/router.config'

import DetailLayout from 'core/layouts/Detail'

import Detail from '../containers/Roles/Detail'
import AuthorityList from '../containers/Roles/Detail/AuthorityList'
import AuthorizedUsers from '../containers/Roles/Detail/AuthorizedUsers'

const PATH = '/workspaces/:workspace/roles/:role'

export default [
  {
    path: PATH,
    component: withProps(DetailLayout, {
      module: 'roles',
      component: Detail,
      breadcrumbs: [
        { label: 'Workspace', url: '/workspaces/:workspace' },
        { label: 'Roles', url: '/workspaces/:workspace/roles' },
      ],
    }),
    routes: [
      {
        name: 'authorities',
        path: `${PATH}/authorities`,
        title: 'Authority List',
        component: AuthorityList,
      },
      {
        name: 'users',
        path: `${PATH}/users`,
        title: 'Authorized Users',
        component: AuthorizedUsers,
      },
      getIndexRoute({ path: PATH, to: `${PATH}/authorities`, exact: true }),
      getIndexRoute({ path: '*', to: '/404', exact: true }),
    ],
  },
]
