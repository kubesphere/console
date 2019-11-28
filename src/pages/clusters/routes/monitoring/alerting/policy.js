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

import Detail from '../../../containers/MonitoringCenter/Alerting/Policy/Detail'
import AlertingRules from '../../../containers/MonitoringCenter/Alerting/Policy/Detail/AlertRules'
import MonitoringTarget from '../../../containers/MonitoringCenter/Alerting/Policy/Detail/MonitoringTarget'
import NotificationRules from '../../../containers/MonitoringCenter/Alerting/Policy/Detail/NotificationRules'
import AlertingHistory from '../../../containers/MonitoringCenter/Alerting/Policy/Detail/AlertHistory'

const PATH = '/monitoring/alert-policy/:name'
const ROUTES = [
  { name: 'alert-rules', title: 'Alerting Rules', component: AlertingRules },
  {
    name: 'monitoring-target',
    title: 'Monitoring Target',
    component: MonitoringTarget,
  },
  {
    name: 'notification-rules',
    title: 'Notification Rules',
    component: NotificationRules,
  },
  {
    name: 'alert-history',
    title: 'Alerting History',
    component: AlertingHistory,
  },
]

export default [
  {
    path: PATH,
    component: withProps(DetailLayout, {
      module: 'alert-policy',
      component: Detail,
      breadcrumbs: [
        { label: 'Monitoring Center', url: '/monitoring' },
        { label: 'Alerting Policy', url: '/monitoring/alert-policy' },
      ],
    }),
    routes: getChildRoutes(ROUTES, PATH),
  },
]
