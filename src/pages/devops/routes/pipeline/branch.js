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
import Sider from '../../containers/Pipelines/Detail/Sider/branch-sider'

import { Activity, CodeQuality } from '../../containers/Pipelines/Detail'

const PATH =
  '/:workspace/clusters/:cluster/devops/:devops/pipelines/:name/branch/:branch'

const ROUTES = [
  { name: 'activity', title: 'Activity', component: Activity },
  { name: 'code-quality', title: 'Code Quality', component: CodeQuality },
]

export default [
  {
    path: PATH,
    component: withProps(DetailLayout, {
      module: 'cicds',
      component: Sider,
      breadcrumbs: [
        {
          label: 'Pipeline List',
          url: '/:workspace/clusters/:cluster/devops/:devops/pipelines',
        },
        {
          label: 'Branch',
          url:
            '/:workspace/clusters/:cluster/devops/:devops/pipelines/:name/branch',
        },
      ],
    }),
    routes: getChildRoutes(ROUTES, PATH),
  },
]
