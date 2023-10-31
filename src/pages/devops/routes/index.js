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
import DevopsListLayout from '../containers/Base/List'
import PipelinesList from '../containers/Pipelines/PipelinesList'
import CDList from '../containers/CD/CDList'
import CRList from '../containers/CodeRepo/CRList'

import BaseInfo from '../containers/BaseInfo'
import Roles from '../containers/Roles'
import Members from '../containers/Members'
import Credential from '../containers/Credential'

import detail from './detail'
import ImageBuilders from '../containers/ImageBuilder'

const PATH = '/:workspace/clusters/:cluster/devops/:devops'

export default [
  {
    path: PATH,
    component: Layout,
    routes: [
      ...detail,
      {
        path: PATH,
        component: DevopsListLayout,
        routes: [
          { path: `${PATH}/pipelines`, component: PipelinesList, exact: true },
          { path: `${PATH}/cd`, component: CDList, exact: true },
          { path: `${PATH}/code-repo`, component: CRList, exact: true },
          {
            path: `${PATH}/imageBuilders`,
            component: ImageBuilders,
            exact: true,
          },
          { path: `${PATH}/base-info`, component: BaseInfo, exact: true },
          { path: `${PATH}/roles`, component: Roles, exact: true },
          { path: `${PATH}/members`, component: Members, exact: true },
          { path: `${PATH}/credentials`, component: Credential, exact: true },
        ],
      },
      getIndexRoute({ path: '*', to: '/404', exact: true }),
    ],
  },
]
