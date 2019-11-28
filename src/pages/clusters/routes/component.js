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
import { getIndexRoute } from 'utils/router.config'

import DetailLayout from 'core/layouts/Detail'

import { getPodRoutes } from 'projects/routes/pod'

import Detail from '../containers/ServiceComponents/Detail'
import ServiceDetails from '../containers/ServiceComponents/Detail/ServiceDetails'

const PATH = '/components/:namespace/:name'

const BREAD_CRUMBS = [{ label: 'Components', url: '/components' }]

export default [
  ...getPodRoutes(PATH, [
    ...BREAD_CRUMBS,
    {
      label: 'Detail',
      url: PATH,
    },
  ]),
  {
    path: PATH,
    component: withProps(DetailLayout, {
      module: 'components',
      component: Detail,
      breadcrumbs: BREAD_CRUMBS,
    }),
    routes: [
      {
        name: 'service-details',
        path: `${PATH}/service-details`,
        title: 'Service Details',
        component: ServiceDetails,
      },
      getIndexRoute({ path: PATH, to: `${PATH}/service-details`, exact: true }),
    ],
  },
]
