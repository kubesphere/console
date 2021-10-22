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

import Metadata from './AnnotationsCard'
import Monitoring from './Monitoring'
import ResourceStatus from './ResourceStatus'
import GatewayConfig from './GatewayConfig'
import GatewayLog from './GatewayLog'

export default PATH => [
  {
    path: `${PATH}/monitors`,
    title: 'MONITORING',
    component: Monitoring,
    exact: true,
  },
  {
    path: `${PATH}/gateway-configs`,
    title: 'CONFIGURATION_OPTIONS',
    component: GatewayConfig,
    exact: true,
  },
  {
    path: `${PATH}/logs`,
    title: 'GATEWAY_LOGS',
    component: GatewayLog,
    exact: true,
  },
  {
    path: `${PATH}/resource-status`,
    title: 'RESOURCE_STATUS',
    component: ResourceStatus,
    exact: true,
  },
  {
    path: `${PATH}/metadata`,
    title: 'METADATA',
    component: Metadata,
    exact: true,
  },
  getIndexRoute({ path: PATH, to: `${PATH}/monitors`, exact: true }),
]
