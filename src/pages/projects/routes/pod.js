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
import Events from 'core/containers/Base/Detail/Events'
import Detail from '../containers/Pods/Detail'
import ResourceStatus from '../containers/Pods/Detail/ResourceStatus'
import ScheduleInfo from '../containers/Pods/Detail/ScheduleInfo'
import Monitoring from '../containers/Pods/Detail/Monitoring'

import { getContainerRoutes } from './container'

const MODULE = 'pods'
const PATH = `/${MODULE}/:podName`
const ROUTES = [
  {
    name: 'resource-status',
    title: 'Resource Status',
    component: ResourceStatus,
  },
  {
    name: 'schedule',
    title: 'Schedule Info',
    component: ScheduleInfo,
  },
  { name: 'monitors', title: 'Monitoring', component: Monitoring },
  { name: 'env', title: 'Environment Variables', component: EnvVariables },
  { name: 'events', title: 'Events', component: Events },
]

export const getPodRoutes = (path, breadcrumbs = [], options = {}) => {
  const podPath = `${path}${PATH}`
  const _breadcrumbs = [
    ...breadcrumbs,
    {
      label: 'Pods',
      url: podPath,
    },
  ]

  const result = [
    {
      path: podPath,
      component: withProps(DetailLayout, {
        module: MODULE,
        component: Detail,
        breadcrumbs: _breadcrumbs,
        parentUrl: options.parentUrl || path,
      }),
      routes: getChildRoutes(ROUTES, podPath),
    },
  ]

  if (!options.deep) {
    result.unshift(...getContainerRoutes(podPath, _breadcrumbs))
  }

  return result
}

export default getPodRoutes('/projects/:namespace')
