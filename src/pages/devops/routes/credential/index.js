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

import Detail from '../../containers/Credential/detail'
import CredentialDetail from '../../containers/Credential/detail/detail'
import Activity from '../../containers/Credential/detail/activity'

const PATH =
  '/:workspace/clusters/:cluster/devops/:devops/credentials/:credential_id'

const ROUTES = [
  { name: 'detail', title: 'Detail', component: CredentialDetail },
  { name: 'activity', title: 'Activity', component: Activity },
]

export default [
  {
    path: PATH,
    component: withProps(DetailLayout, {
      module: 'credentials',
      component: Detail,
      breadcrumbs: [
        {
          label: 'Credentials',
          url: '/:workspace/clusters/:cluster/devops/:devops/credentials',
        },
      ],
    }),
    routes: getChildRoutes(ROUTES, PATH),
  },
]
