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
import Detail from '../../containers/StatefulSets/Detail'
import RevisionControl from '../../containers/Deployments/Detail/RevisionControl'
import ResourceStatus from '../../containers/StatefulSets/Detail/ResourceStatus'
import Monitoring from '../../containers/StatefulSets/Detail/Monitoring'

import RevisionDetail from '../../containers/StatefulSets/RevisionDetail'
import ConfigTemplate from '../../containers/StatefulSets/RevisionDetail/ConfigTemplate'

import { getPodRoutes } from '../pod'

const MODULE = 'statefulsets'
const PATH = `/projects/:namespace/${MODULE}/:name`
const REVISION_PATH = `${PATH}/revisions/:revision`
const ROUTES = [
  {
    name: 'resource-status',
    title: 'Resource Status',
    component: ResourceStatus,
  },
  {
    name: 'revision-control',
    title: 'Revision Records',
    component: RevisionControl,
  },
  { name: 'monitors', title: 'Monitoring', component: Monitoring },
  { name: 'env', title: 'Environment Variables', component: EnvVariables },
  { name: 'events', title: 'Events', component: Events },
]

const REVISION_ROUTES = [
  {
    name: 'config-template',
    title: 'Config Template',
    component: ConfigTemplate,
  },
  { name: 'env', title: 'Environment Variables', component: EnvVariables },
  { name: 'events', title: 'Events', component: Events },
]

const BreadCrumbs = [
  {
    label: 'Project',
    url: '/projects/:namespace',
  },
  {
    label: 'StatefulSets',
    url: `/projects/:namespace/${MODULE}`,
  },
]

export default [
  ...getPodRoutes(PATH, [
    ...BreadCrumbs,
    {
      label: 'Detail',
      url: `/projects/:namespace/${MODULE}/:name`,
    },
  ]),
  {
    path: REVISION_PATH,
    component: withProps(DetailLayout, {
      module: MODULE,
      component: RevisionDetail,
      breadcrumbs: [
        ...BreadCrumbs,
        {
          label: 'Revision Records',
          url: `/projects/:namespace/${MODULE}/:name/revision-control`,
        },
      ],
    }),
    routes: getChildRoutes(REVISION_ROUTES, REVISION_PATH),
  },
  {
    path: PATH,
    component: withProps(DetailLayout, {
      module: MODULE,
      component: Detail,
      breadcrumbs: BreadCrumbs,
    }),
    routes: getChildRoutes(ROUTES, PATH),
  },
]
