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

import Detail from '../containers/LogCollection/Detail'
import Configuration from '../containers/LogCollection/Detail/Configuration'
import Log from '../containers/LogCollection/Detail/Log'

const PATH = '/log-collection/:name'

export default [
  {
    path: PATH,
    component: withProps(DetailLayout, {
      module: '',
      component: Detail,
      breadcrumbs: [
        { label: 'Log Collection', url: '/platform-settings/log-collection' },
      ],
    }),
    routes: [
      {
        name: 'configuration',
        path: `${PATH}/configuration`,
        title: 'Configuration',
        component: Configuration,
      },
      {
        name: 'Log',
        path: `${PATH}/log`,
        title: 'Log',
        component: Log,
        hide: store => store.Name !== 'es',
      },
      getIndexRoute({ path: PATH, to: `${PATH}/configuration`, exact: true }),
      getIndexRoute({ path: '*', to: '/404', exact: true }),
    ],
  },
]
