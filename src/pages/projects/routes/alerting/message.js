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

import AlertingDetail from 'clusters/containers/MonitoringCenter/Alerting/Message/Detail/AlertDetail'
import AlertingPolicy from 'clusters/containers/MonitoringCenter/Alerting/Message/Detail/AlertPolicy'
import NotificationHistory from 'clusters/containers/MonitoringCenter/Alerting/Message/Detail/NotificationHistory'
import Comment from 'clusters/containers/MonitoringCenter/Alerting/Message/Detail/Comment'
import Detail from '../../containers/Alerting/Message/Detail'

const PATH = '/projects/:namespace/alert-message'
const UNRESOLVED_PATH = `${PATH}/unresolved/:id`
const ALL_PATH = `${PATH}/all/:id`

const ROUTES = [
  { name: 'alert-detail', title: 'Alerting Detail', component: AlertingDetail },
  { name: 'alert-policy', title: 'Alerting Policy', component: AlertingPolicy },
  {
    name: 'notification-history',
    title: 'Recent Notification',
    component: NotificationHistory,
  },
  { name: 'comment', title: 'ALERT_COMMENT', component: Comment },
]

export default [
  {
    path: UNRESOLVED_PATH,
    component: withProps(DetailLayout, {
      module: 'alert-message',
      component: Detail,
      breadcrumbs: [
        {
          label: 'Project',
          url: '/projects/:namespace',
        },
        {
          label: 'Alerting Message',
          url: '/projects/:namespace/alert-message',
        },
        {
          label: 'Unresolved',
          url: '/projects/:namespace/alert-message/unresolved',
        },
      ],
    }),
    ksModule: 'alerting',
    routes: getChildRoutes(ROUTES, UNRESOLVED_PATH),
  },
  {
    path: ALL_PATH,
    component: withProps(DetailLayout, {
      module: 'alert-message',
      component: Detail,
      breadcrumbs: [
        {
          label: 'Project',
          url: '/projects/:namespace',
        },
        {
          label: 'Alerting Message',
          url: '/projects/:namespace/alert-message',
        },
        {
          label: 'All',
          url: '/projects/:namespace/alert-message/all',
        },
      ],
    }),
    ksModule: 'alerting',
    routes: getChildRoutes(ROUTES, ALL_PATH),
  },
]
