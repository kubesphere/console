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

import ListLayout from '../containers/Base/List'

import Overview from '../containers/Overview'
import Applications from '../containers/Applications'
import Deployments from '../containers/Deployments'
import StatefulSets from '../containers/StatefulSets'
import Services from '../containers/Services'
import Routes from '../containers/Routes'
import Volumes from '../containers/Volumes'
import BaseInfo from '../containers/BaseInfo'
import ConfigMaps from '../containers/ConfigMaps'
import Secrets from '../containers/Secrets'
import QuotaManage from '../containers/QuotaManage'
import AdvancedSettings from '../containers/AdvancedSettings'
import AlertingPolicies from '../containers/Alerting/Policies'
import AlertingMessages from '../containers/Alerting/Messages'

import getDetailPath from './detail'

const PATH = '/:workspace/federatedprojects/:namespace'

export default [
  ...getDetailPath(PATH),
  {
    path: PATH,
    component: ListLayout,
    routes: [
      {
        path: `${PATH}/overview`,
        component: Overview,
        exact: true,
      },
      {
        path: `${PATH}/applications`,
        component: Applications,
        exact: true,
      },
      {
        path: `${PATH}/deployments`,
        component: Deployments,
        exact: true,
      },
      {
        path: `${PATH}/statefulsets`,
        component: StatefulSets,
        exact: true,
      },
      { path: `${PATH}/services`, component: Services, exact: true },
      { path: `${PATH}/ingresses`, component: Routes, exact: true },
      { path: `${PATH}/volumes`, component: Volumes, exact: true },
      { path: `${PATH}/base-info`, component: BaseInfo, exact: true },
      { path: `${PATH}/configmaps`, component: ConfigMaps, exact: true },
      { path: `${PATH}/secrets`, component: Secrets, exact: true },
      { path: `${PATH}/quota`, component: QuotaManage, exact: true },
      { path: `${PATH}/advanced`, component: AdvancedSettings, exact: true },
      {
        path: `${PATH}/alert-policies`,
        component: AlertingPolicies,
        exact: true,
      },
      {
        path: `${PATH}/alert-messages`,
        component: AlertingMessages,
        exact: true,
      },
      getIndexRoute({
        path: `${PATH}/workloads`,
        to: `${PATH}/deployments`,
        exact: true,
      }),
      getIndexRoute({ path: PATH, to: `${PATH}/overview`, exact: true }),
      getIndexRoute({ path: '*', to: '/404', exact: true }),
    ],
  },
]
