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
  // Attributes
  // More > Edit Settings
  // More > Edit Settings > Update Strategy
  // More > Edit Settings > Containers
  // More > Edit Settings > Volumes
  // More > Edit Settings > Pod Scheduling Rules
  // More > Edit Settings > Cluster Differences
  // More > Edit YAML
  // More > Delete
  // Monitoring
  // Config
  GATEWAY_CONFIGURATION: 'Gateway Configuration',

  // Resource Status
  MICROSERVICEGATEWAYS_REPLICA_DESC:
    'Deployment is used to describe a desired state that is expected to be reached by the application. It is mainly used to describe stateless applications. The number and state of replicas are maintained by the deployment controller, ensuring the state is consistent with the defined expected state. You can increase the replicas to meet higher loads. Rolling back the deployment version can eliminate program bugs. And you can create an autoscaler to flexibly handle the load in different scenarios.',
}
