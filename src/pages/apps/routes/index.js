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

import Home from '../containers/Home'
import AppDetail from '../containers/AppDetail'
import AppDeploy from '../containers/AppDeploy'

import Layout from '../containers/layout'
import StoreManage from '../containers/StoreManage'
import Categories from '../containers/Categories'
import Reviews from '../containers/Reviews'

import detail from './detail'

const PATH = '/apps-manage'

export default [
  ...detail,
  {
    path: PATH,
    component: Layout,
    routes: [
      {
        path: `${PATH}/store`,
        component: StoreManage,
        exact: true,
      },
      {
        path: `${PATH}/categories`,
        component: Categories,
        exact: true,
      },
      {
        path: `${PATH}/reviews/:type`,
        component: Reviews,
        exact: true,
      },
      getIndexRoute({ path: PATH, to: `${PATH}/store`, exact: true }),
      getIndexRoute({
        path: `${PATH}/reviews/`,
        to: `${PATH}/reviews/unprocessed`,
        exact: true,
      }),
      getIndexRoute({ path: '*', to: '/404', exact: true }),
    ],
  },
  { path: '/apps', component: Home, exact: true },
  { path: '/apps/:appId', component: AppDetail, exact: true },
  { path: '/apps/:appId/deploy', component: AppDeploy, exact: true },
]
