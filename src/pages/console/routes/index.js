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

import Projects from '../containers/Projects'
import Dashboard from '../containers/Dashboard'
import NotFound from '../containers/NotFound'
import ServiceComponents from '../containers/ServiceComponents'

import componentRoutes from './component'
import volumeRoutes from './volume'
import monitoringRoutes from './monitoring'

export default [
  { path: '/404', component: NotFound, exact: true },
  { path: '/dashboard', component: Dashboard, exact: true },
  { path: '/projects', component: Projects, exact: true },
  { path: '/components', component: ServiceComponents, exact: true },
  ...monitoringRoutes,
  ...componentRoutes,
  ...volumeRoutes,
  {
    path: '/',
    redirect: { from: '/', to: '/dashboard', exact: true },
  },
  {
    path: '*',
    redirect: { from: '*', to: '/404', exact: true },
  },
]
