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
  SERVICE_PL: '服務',
  SERVICE_DESC: 'Services provide an abstract way to expose applications running on a Pod as network services.',
  // List
  SERVICE_EMPTY_DESC: 'Please create a Service.',
  UNKNOWN: 'Unknown',
  EXTERNAL_ACCESS: '外網訪問',
  // List > Edit YAML
  // List > Edit Service
  UNKNOWN_SERVICE_TYPE: 'Unknown Service Type',
  // List > Delete
  SERVICE: '服務',
  SERVICE_LOW: '服務',
  // List > Create
  INTERNAL_ACCESS_MODE: 'Internal Access Mode',
  CREATE_SERVICE: '創建服務',
  // List > Create > Basic Information
  SERVICE_NAME_DESC: 'The name can contain only lowercase letters, numbers, and hyphens (-), must start with a lowercase letter, and must end with a lowercase letter or number. The maximum length is 63 characters.',
  // List > Create > Service Settings
  VIRTUAL_IP_TITLE: 'Virtual IP Address',
  INTERNAL_DOMAIN_NAME: 'Internal Domain Name',
  CONTAINER_PORT: '容器端口',
  INVALID_PORT: '端口無效。',
  PORT_EMPTY: '請輸入端口',
  ENTER_SELECTOR_TIP: 'Please set a workload selector.',
  Ports: '端口',
  SPECIFY_WORKLOAD: '指定工作負載',
  SELECT_WORKLOAD_DESC: '將工作負載所創建的容器組副本的 Label 作為預填充内容。',
  VIRTUAL_IP_DESC: 'The cluster generates a unique IP address for the Service and the Service can be accessed within the cluster using this IP address.',
  INTERNAL_DOMAIN_NAME_DESC: 'The cluster does not generate an IP address for the Service and the Service can be directly accessed using the Endpoint IP address of the Service.',
  SERVICE_PORTS_DESC: 'Set the container ports and Service ports.',
  NO_WORKLOAD_MATCH_SELECTOR: 'The current selector matches no workload.',
  WORKLOADS_MATCH_SELECTOR_SI: 'The current selector ({selector}) matches {count} workload.',
  WORKLOADS_MATCH_SELECTOR_PL: 'The current selector ({selector}) matches {count} workloads.',
  WORKLOAD_SELECTOR: 'Workload Selector',
  SERVICE_SETTINGS: '服務設置',
  // List > Create > Service Settings > Workload Selector > View Details
  TOTAL_WORKLOADS_VALUE: '共 {count} 個工作負載',
  // List > Create > Advanced Settings
  STICKY_SESSION: '會話保持',
  MAXIMUM_STICKINESS_DURATION: '最大會話保持時間（s）',
  STICKY_SESSION_DESC: 'Set the system to forward all requests from the same client to the same backend within a specified duration.',
  SERVICE_EXTERNAL_ACCESS_DESC: '將服務暴露给外網',
  ACCESS_NODEPORT_TIP: '通過集群節點的對應端口來訪問服務。',
  ACCESS_LOADBALANCER_TIP: '通過負載平衡器來訪問服務。',
  WORKLOAD_ANNOTATIONS: 'Workload Annotations',
  LABEL_FORMAT_DESC: 'The key and value can contain only uppercase and lowercase letters, numbers, hyphens (-), underscores (_), and dots (.), and must begin and end with an uppercase or lowercase letter or number. The maximum length is 63 characters. If the key contains the domain name, the maximum length is 253 characters.'
};