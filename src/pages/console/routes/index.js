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

import Dashboard from '../containers/Dashboard'
import NotFound from '../containers/NotFound'
import LogQuery from '../containers/LogQuery'
import EventSearch from '../containers/EventSearch'
import AuditingSearch from '../containers/AuditingSearch'
import Bill from '../containers/Bill'

export default [
  { path: '/404', component: NotFound, exact: true },
  { path: '/dashboard', component: Dashboard, exact: true },
  { path: `/logquery`, exact: true, component: LogQuery },
  { path: '/eventsearch', exact: true, component: EventSearch },
  { path: '/auditingsearch', exact: true, component: AuditingSearch },
  { path: '/bill', exact: true, component: Bill },
  {
    path: '/',
    redirect: { from: '/', to: '/dashboard', exact: true },
  },
  {
    path: '*',
    redirect: { from: '*', to: '/404', exact: true },
  },
]
