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

import { compareVersion } from 'utils'
import { getChildRoutes } from 'utils/router.config'

import {
  Activity,
  Artifacts,
  Branch,
  CodeQuality,
  Commit,
  Events,
  Pipeline,
  PipelineOld,
  PullRequest,
  TaskStatus,
} from './index'
import BranchLayout from './Layout/branch'

import PipelineLayout from './Layout/pipeline'
import RunLayout from './Layout/runs'

const PATH = '/:workspace/clusters/:cluster/devops/:devops/pipelines/:name'

const BRANCH_PATH = `${PATH}/branch/:branch`

const RUN_PATH = `${BRANCH_PATH}/run/:runName`

const PATH_NO_BRANCH = `${PATH}/run/:runName`

const getComponent = version => {
  return [
    [
      v => {
        return compareVersion(v, '3.4.0') < 0
      },
      PipelineOld,
    ],
    [() => true, Pipeline],
  ].find(([condition]) => condition(version))[1]
}
const PIPELINE_ROUTES = [
  { name: 'pipeline', title: 'PIPELINE_CONFIGURATION', getComponent },
  { name: 'code-quality', title: 'CODE_CHECK', component: CodeQuality },
  { name: 'activity', title: 'RUN_RECORDS', component: Activity },
  { name: 'branch', title: 'BRANCH_PL', component: Branch },
  { name: 'pull-request', title: 'PULL_REQUEST_PL', component: PullRequest },
]

const PIPELINE_BRANCH_ROUTES = [
  { name: 'activity', title: 'RUN_RECORDS', component: Activity },
  { name: 'code-quality', title: 'CODE_CHECK', component: CodeQuality },
]

const PIPELINE_RUN_ROUTES = [
  { name: 'task-status', title: 'TASK_STATUS', component: TaskStatus },
  { name: 'commit', title: 'COMMIT_PL', component: Commit },
  { name: 'artifacts', title: 'ARTIFACT_PL', component: Artifacts },
  { name: 'events', title: 'EVENT_PL', component: Events },
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
