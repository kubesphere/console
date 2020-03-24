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

import { getChildRoutes } from 'utils/router.config'

import Unresolved from 'console/containers/MonitoringCenter/Alerting/Message/Unresolved'
import All from 'console/containers/MonitoringCenter/Alerting/Message/All'
import AlertingMessageLayout from '../../containers/Alerting/Message'
import AlertingPolicy from '../../containers/Alerting/Policy'

const PATH = '/projects/:namespace'
const MESSAGE_PATH = `${PATH}/alert-message`
const POLICY_PATH = `${PATH}/alert-policy`

const ROUTES = [
  { name: 'unresolved', title: 'Unresolved', component: Unresolved },
  { name: 'all', title: 'All', component: All },
]

export default [
  {
    path: MESSAGE_PATH,
    component: AlertingMessageLayout,
    ksModule: 'alerting',
    routes: getChildRoutes(ROUTES, MESSAGE_PATH),
  },
  {
    path: POLICY_PATH,
    component: AlertingPolicy,
    ksModule: 'alerting',
    exact: true,
  },
]
