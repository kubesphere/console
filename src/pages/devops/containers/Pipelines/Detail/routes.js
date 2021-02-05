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

import { getChildRoutes } from 'utils/router.config'

import PipelineLayout from './Layout/pipeline'
import BranchLayout from './Layout/branch'
import RunLayout from './Layout/runs'

import {
  Pipeline,
  Activity,
  Branch,
  PullRequest,
  CodeQuality,
  TaskStatus,
  Commit,
  Artifacts,
} from './index'

const PATH = '/:workspace/clusters/:cluster/devops/:devops/pipelines/:name'

const BRANCH_PATH = `${PATH}/branch/:branch`

const RUN_PATH = `${BRANCH_PATH}/run/:runId`

const PATH_NO_BRANCH = `${PATH}/run/:runId`

const PIPELINE_ROUTES = [
  { name: 'pipeline', title: 'Pipeline', component: Pipeline },
  { name: 'code-quality', title: 'Code Quality', component: CodeQuality },
  { name: 'activity', title: 'Activity', component: Activity },
  { name: 'branch', title: 'Branches', component: Branch },
  { name: 'pull-request', title: 'Pull Requestes', component: PullRequest },
]

const PIPELINE_BRANCH_ROUTES = [
  { name: 'activity', title: 'Activity', component: Activity },
  { name: 'code-quality', title: 'Code Quality', component: CodeQuality },
]

const PIPELINE_RUN_ROUTES = [
  { name: 'task-status', title: 'TaskStatus', component: TaskStatus },
  { name: 'commit', title: 'Commit', component: Commit },
  { name: 'artifacts', title: 'Artifacts', component: Artifacts },
]

export default [
  {
    path: RUN_PATH,
    component: RunLayout,
    routes: getChildRoutes(PIPELINE_RUN_ROUTES, RUN_PATH),
  },
  {
    path: PATH_NO_BRANCH,
    component: RunLayout,
    routes: getChildRoutes(PIPELINE_RUN_ROUTES, PATH_NO_BRANCH),
  },
  {
    path: BRANCH_PATH,
    component: BranchLayout,
    routes: getChildRoutes(PIPELINE_BRANCH_ROUTES, BRANCH_PATH),
  },
  {
    path: PATH,
    component: PipelineLayout,
    routes: getChildRoutes(PIPELINE_ROUTES, PATH),
  },
]
