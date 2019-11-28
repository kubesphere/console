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

import EnvVariables from 'core/containers/Base/Detail/EnvVariables'
import Detail from '../containers/Pods/Containers/Detail'
import ResourceStatus from '../containers/Pods/Containers/ResourceStatus'
import Monitoring from '../containers/Pods/Containers/Monitoring'
import Logs from '../containers/Pods/Containers/Logs'

const MODULE = 'containers'
const PATH = `/${MODULE}/:containerName`
const ROUTES = [
  {
    name: 'resource-status',
    title: 'Resource Status',
    component: ResourceStatus,
  },
  { name: 'monitors', title: 'Monitoring', component: Monitoring },
  { name: 'env', title: 'Environment Variables', component: EnvVariables },
  { name: 'logs', title: 'Container Logs', component: Logs },
]

export const getContainerRoutes = (path, breadcrumbs = []) => {
  const containerPath = `${path}${PATH}`
  return [
    {
      path: containerPath,
      component: withProps(DetailLayout, {
        module: MODULE,
        component: Detail,
        breadcrumbs: [
          ...breadcrumbs,
          {
            label: 'Containers',
            url: containerPath,
          },
        ],
      }),
      routes: getChildRoutes(ROUTES, containerPath),
    },
  ]
}

export default getContainerRoutes()
