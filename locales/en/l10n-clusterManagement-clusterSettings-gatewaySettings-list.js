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

module.exports = {
  // Banner
  // Cluster Gateway
  GATEWAY_ADDRESS_SCAP: 'Gateway address',

  // Cluster Gateway > Enable Gateway
  ENABLE_GATEWAY: 'Enable Gateway',
  GATEWAY_TRACING_TIP:
    'If Routes cannot be accessed after <b>Tracing</b> is enabled, please add the annotation <b>nginx.ingress.kubernetes.io/service-upstream: true </b> to the Route.',

  // Cluster Gateway > Manage > View Details
  VIEW_DETAILS: 'View Details',

  // Cluster Gateway > Manage > Disable
  DISABLE: 'Disable',

  // Cluster Gateway > Manage > Edit
  EDIT: 'Edit',
  EDIT_TITLE: 'Edit {title}',

  // Cluster Gateway > Manage > Delete
  // Project Gateway
  REPLICA_COUNT: 'Replicas',
  NODE_PORTS: 'Node Ports',
}
