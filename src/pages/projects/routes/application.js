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

import OPAppDetail from '../containers/Applications/Detail/OPApp'
import CRDAppDetail from '../containers/Applications/Detail/CRDApp'
import ResourceStatus from '../containers/Applications/Detail/ResourceStatus'
import AppTemplate from '../containers/Applications/Detail/AppTemplate'
import EnvVariables from '../containers/Applications/Detail/EnvVariables'
import AppComponents from '../containers/Applications/Detail/AppComponents'
import TrafficManangement from '../containers/Applications/Detail/TrafficManangement'
import GrayRelease from '../containers/Applications/Detail/GrayRelease'
import Tracing from '../containers/Applications/Detail/Tracing'

const TEMPLATE_PATH = '/projects/:namespace/applications/template/:id'
const COMPOSING_PATH = '/projects/:namespace/applications/composing/:name'

const COMPOSING_ROUTES = [
  {
    name: 'components',
    title: 'Application Components',
    component: AppComponents,
  },
  {
    name: 'traffic',
    title: 'Traffic Management',
    component: TrafficManangement,
    ksModule: 'servicemesh',
  },

  {
    name: 'grayrelease',
    title: 'Grayscale Release',
    component: GrayRelease,
    ksModule: 'servicemesh',
  },
  {
    name: 'tracing',
    title: 'Tracing',
    component: Tracing,
    ksModule: ['servicemesh', 'logging'],
  },
]

const TEMPLATE_ROUTES = [
  {
    name: 'resource-status',
    title: 'Resource Status',
    component: ResourceStatus,
  },
  { name: 'template', title: 'App Template', component: AppTemplate },
  { name: 'env', title: 'Environment Variables', component: EnvVariables },
]

export default [
  {
    path: TEMPLATE_PATH,
    component: withProps(DetailLayout, {
      module: 'applications',
      component: OPAppDetail,
      breadcrumbs: [
        {
          label: 'Project',
          url: '/projects/:namespace',
        },
        {
          label: 'Applications',
          url: '/projects/:namespace/applications/template',
        },
      ],
    }),
    ksModule: 'openpitrix',
    routes: getChildRoutes(TEMPLATE_ROUTES, TEMPLATE_PATH),
  },
  {
    path: COMPOSING_PATH,
    component: withProps(DetailLayout, {
      module: 'applications',
      component: CRDAppDetail,
      breadcrumbs: [
        {
          label: 'Project',
          url: '/projects/:namespace',
        },
        {
          label: 'Applications',
          url: '/projects/:namespace/applications/composing',
        },
      ],
    }),
    routes: getChildRoutes(COMPOSING_ROUTES, COMPOSING_PATH),
  },
]
