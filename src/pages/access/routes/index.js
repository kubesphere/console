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

import Layout from '../containers/layout'
import Accounts from '../containers/Accounts'
import Roles from '../containers/Roles'
import Workspaces from '../containers/Workspaces'

import detail from './detail'

const PATH = '/access'

export default [
  ...detail,
  {
    path: PATH,
    component: Layout,
    routes: [
      { path: `${PATH}/accounts`, component: Accounts, exact: true },
      { path: `${PATH}/roles`, component: Roles, exact: true },
      { path: `${PATH}/workspaces`, component: Workspaces, exact: true },
    ],
  },
]
