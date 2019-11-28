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
import VersionManage from 'apps/containers/Store/Detail/VersionManage'
import AppInformation from 'apps/containers/Store/Detail/AppInformation'
import AuditRecord from 'apps/containers/Store/Detail/AuditRecord'
import AppInstances from 'apps/containers/Store/Detail/AppInstances'
import AppDetail from '../containers/Apps/Detail'

const PATH = '/workspaces/:workspace/apps/:appId'
const ROUTES = [
  {
    name: 'versions',
    title: 'Versions',
    component: VersionManage,
  },
  {
    name: 'app-information',
    title: 'App Information',
    component: AppInformation,
  },
  {
    name: 'audit-records',
    title: 'Audit Records',
    component: AuditRecord,
  },
  {
    name: 'app-instances',
    title: 'App Instances',
    component: AppInstances,
  },
]
export default [
  {
    path: PATH,
    component: withProps(DetailLayout, {
      module: 'applications',
      component: AppDetail,
      breadcrumbs: [
        {
          label: 'Workspaces',
          url: '/workspaces/:workspace',
        },
        {
          label: 'Applications',
          url: '/workspaces/:workspace/apps',
        },
      ],
    }),
    ksModule: 'openpitrix',
    routes: getChildRoutes(ROUTES, PATH),
  },
]
