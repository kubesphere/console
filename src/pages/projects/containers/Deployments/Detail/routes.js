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

import Events from 'core/containers/Base/Detail/Events'
import EnvVariables from 'core/containers/Base/Detail/EnvVariables'
import Metadata from 'core/containers/Base/Detail/Metadata'
import ResourceStatus from './ResourceStatus'
import RevisionControl from './RevisionControl'
import Monitoring from './Monitoring'

export default path => [
  {
    path: `${path}/resource-status`,
    title: 'RESOURCE_STATUS',
    component: ResourceStatus,
    exact: true,
  },
  {
    path: `${path}/revision-control`,
    title: 'REVISION_RECORDS',
    component: RevisionControl,
    exact: true,
  },
  {
    path: `${path}/metadata`,
    title: 'METADATA',
    component: Metadata,
    exact: true,
  },
  {
    path: `${path}/monitors`,
    title: 'MONITORING',
    component: Monitoring,
    exact: true,
  },
  {
    path: `${path}/env`,
    title: 'ENVIRONMENT_VARIABLE_PL',
    component: EnvVariables,
    exact: true,
  },
  { path: `${path}/events`, title: 'EVENT_PL', component: Events, exact: true },
  getIndexRoute({ path, to: `${path}/resource-status`, exact: true }),
]
