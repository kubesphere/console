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
import PipelineSider from '../../containers/Pipelines/Detail/Sider/pipeline-sider'

import {
  Pipeline,
  Activity,
  Branch,
  PullRequest,
  CodeQuality,
} from '../../containers/Pipelines/Detail'

import branchRoutes from './branch'
import runRoutes from './run'

const PATH = '/:workspace/clusters/:cluster/devops/:devops/pipelines/:name'

const ROUTES = [
  { name: 'pipeline', title: 'Pipeline', component: Pipeline },
  { name: 'code-quality', title: 'Code Quality', component: CodeQuality },
  { name: 'activity', title: 'Activity', component: Activity },
  { name: 'branch', title: 'Branch', component: Branch },
  { name: 'pull-request', title: 'PullRequest', component: PullRequest },
]

export default [
  ...runRoutes,
  ...branchRoutes,
  {
    path: PATH,
    component: withProps(DetailLayout, {
      module: 'cicd',
      component: PipelineSider,
      breadcrumbs: [
        {
          label: 'Pipeline List',
          url: '/:workspace/clusters/:cluster/devops/:devops/pipelines',
        },
      ],
    }),
    routes: getChildRoutes(ROUTES, PATH),
  },
]
