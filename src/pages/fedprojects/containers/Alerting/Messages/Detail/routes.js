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

import AlertingDetail from 'clusters/containers/Alerting/Messages/Detail/AlertDetail'
import AlertingPolicy from 'clusters/containers/Alerting/Messages/Detail/AlertPolicy'
import NotificationHistory from 'clusters/containers/Alerting/Messages/Detail/NotificationHistory'
import Comment from 'clusters/containers/Alerting/Messages/Detail/Comment'

const PATH = '/cluster/:cluster/projects/:namespace/alert-messages/:id'

export default [
  {
    path: `${PATH}/alert-detail`,
    title: 'Alerting Detail',
    component: AlertingDetail,
    exact: true,
  },
  {
    path: `${PATH}/alert-policy`,
    title: 'Alerting Policy',
    component: AlertingPolicy,
    exact: true,
  },
  {
    path: `${PATH}/notification-history`,
    title: 'Recent Notification',
    component: NotificationHistory,
    exact: true,
  },
  {
    path: `${PATH}/comment`,
    title: 'ALERT_COMMENT',
    component: Comment,
    exact: true,
  },
  getIndexRoute({ path: PATH, to: `${PATH}/alert-detail`, exact: true }),
]
