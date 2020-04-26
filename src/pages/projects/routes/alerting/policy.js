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

import AlertingRules from 'console/containers/MonitoringCenter/Alerting/Policy/Detail/AlertRules'
import MonitoringTarget from 'console/containers/MonitoringCenter/Alerting/Policy/Detail/MonitoringTarget'
import NotificationRules from 'console/containers/MonitoringCenter/Alerting/Policy/Detail/NotificationRules'
import AlertingHistory from 'console/containers/MonitoringCenter/Alerting/Policy/Detail/AlertHistory'
import Detail from '../../containers/Alerting/Policy/Detail'

const PATH = '/cluster/:cluster/projects/:namespace/alert-policy/:name'
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
      module: 'policy',
      component: Detail,
      breadcrumbs: [
        {
          label: 'Project',
          url: '/projects/:namespace',
        },
        {
          label: 'Alerting Policy',
          url: '/projects/:namespace/alert-policy',
        },
      ],
    }),
    ksModule: 'alerting',
    routes: getChildRoutes(ROUTES, PATH),
  },
]
