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

import AppDetail from '../containers/Applications/Detail'
import DeploymentDetail from '../containers/Deployments/Detail'
import StatefulSetDetail from '../containers/StatefulSets/Detail'
import ServiceDetail from '../containers/Services/Detail'
import RouteDetail from '../containers/Routes/Detail'
import VolumeDetail from '../containers/Volumes/Detail'
import SecretDetail from '../containers/Secrets/Detail'
import ConfigMapDetail from '../containers/ConfigMaps/Detail'
import AlertPoliciesDetail from '../containers/Alerting/Policies/Detail'
import AlertMessagesDetail from '../containers/Alerting/Messages/Detail'

export default PATH => [
  {
    path: `${PATH}/deployments/:name`,
    component: DeploymentDetail,
  },
  {
    path: `${PATH}/statefulsets/:name`,
    component: StatefulSetDetail,
  },
  {
    path: `${PATH}/services/:name`,
    component: ServiceDetail,
  },
  {
    path: `${PATH}/ingresses/:name`,
    component: RouteDetail,
  },
  {
    path: `${PATH}/volumes/:name`,
    component: VolumeDetail,
  },
  {
    path: `${PATH}/secrets/:name`,
    component: SecretDetail,
  },
  {
    path: `${PATH}/configmaps/:name`,
    component: ConfigMapDetail,
  },
  {
    path: `${PATH}/applications/:name`,
    component: AppDetail,
  },
  {
    path: `${PATH}/alert-policies/:name`,
    component: AlertPoliciesDetail,
  },
  {
    path: `${PATH}/alert-messages/:id`,
    component: AlertMessagesDetail,
  },
]
