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
  SERVICE_PL: 'Services',
  SERVICE_DESC: 'Services provide an abstract way to expose applications running on a pod as network services.',
  // List
  SERVICE_EMPTY_DESC: 'Please create a service.',
  UNKNOWN: 'Unknown',
  EXTERNAL_ACCESS: 'External Access',
  INTERNAL_ACCESS: 'Internal Access',
  // List > Edit YAML
  // List > Edit Service
  UNKNOWN_SERVICE_TYPE: 'Unknown Service Type',
  // List > Delete
  SERVICE: 'Service',
  SERVICE_LOW: 'service',
  // List > Create
  INTERNAL_ACCESS_MODE: 'Internal Access Mode',
  CREATE_SERVICE: 'Create Service',
  // List > Create > Basic Information
  SERVICE_NAME_DESC: 'The name can contain only lowercase letters, numbers, and hyphens (-), must start with a lowercase letter, and must end with a lowercase letter or number. The maximum length is 63 characters.',
  // List > Create > Service Settings
  VIRTUAL_IP_TITLE: 'Virtual IP Address',
  INTERNAL_DOMAIN_NAME: 'Internal Domain Name',
  CONTAINER_PORT: 'Container Port',
  INVALID_PORT: 'Invalid port.',
  PORT_EMPTY: 'Please set at least one port.',
  ENTER_SELECTOR_TIP: 'Please set a workload selector.',
  Ports: 'Ports',
  SPECIFY_WORKLOAD: 'Specify Workload',
  SELECT_WORKLOAD_DESC: 'Use labels of a workload as the selector.',
  VIRTUAL_IP_DESC: 'A virtual IP address is assigned to the service. The service can be accessed within the cluster through the virtual IP address.',
  INTERNAL_DOMAIN_NAME_DESC: 'No IP address is assigned to the service. The service can be accessed within the cluster through the cluster DNS mechanism.',
  SERVICE_PORTS_DESC: 'Set the container ports and service ports.',
  NO_WORKLOAD_MATCH_SELECTOR: 'The current selector matches no workload.',
  WORKLOADS_MATCH_SELECTOR_SI: 'The current selector ({selector}) matches {count} workload.',
  WORKLOADS_MATCH_SELECTOR_PL: 'The current selector ({selector}) matches {count} workloads.',
  WORKLOAD_SELECTOR: 'Workload Selector',
  SERVICE_SETTINGS: 'Service Settings',
  // List > Create > Service Settings > Workload Selector > View Details
  TOTAL_WORKLOADS_VALUE: 'Total Workloads: {count}',
  // List > Create > Advanced Settings
  OPENELB_NOT_READY: "OpenELB is not installed. Please install OpenELB.",
  SESSION_PERSISTENCE: 'Session Persistence',
  MAXIMUM_STICKINESS_DURATION: 'Maximum Stickiness Duration (s)',
  SESSION_PERSISTENCE_DESC: 'Set the system to forward all requests from the same client to the same pod within a specified duration.',
  SERVICE_EXTERNAL_ACCESS_DESC: 'Set the method for accessing the service from outside the cluster.',
  ACCESS_NODEPORT_TIP: 'Use a port of the cluster nodes to access the service.',
  ACCESS_LOADBALANCER_TIP: 'Use a load balancer to access the service.',
  WORKLOAD_ANNOTATIONS: 'Workload Annotations',
  LABEL_FORMAT_DESC: 'The key and value of a label can contain only letters, numbers, hyphens (-), underscores (_), and dots (.), and must start and end with a letter or number. The maximum length of each key and each value is 63 characters (if the key contains a domain name, the maximum length is 253 characters).',
}
