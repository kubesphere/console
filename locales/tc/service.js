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
  services: '服務',
  routes: '應用路由',
  Ports: '端口',
  selector: '選擇器',
  EXTERNAL_IP_ADDRESS: '外部 IP 地址',
  EXTERNAL_IP_ADDRESS_SCAP: 'External IP address',
  'LoadBalancer IP': '負載平衡 IP',
  CREATE_SERVICE: '創建服務',
  'Delete Service': '刪除服務',
  'Target Port': '目標端口',
  CONTAINER_PORT: '容器端口',
  CONTAINER_PORT_SCAP: 'Container port',
  SERVICE_PORT_SCAP: 'Service port',
  CONTAINER_PORT_VALUE: '容器端口：{value}',
  SERVICE_PORT: '服務端口',
  SERVICE_PORT_VALUE: '服務端口：{value}',
  'Node Port': '節點端口',
  'Node Port(s)': '節點端口',
  EDIT_SERVICE: '編輯服務',
  EDIT_EXTERNAL_ACCESS: '編輯外網訪問',
  EDIT_MONITORING_EXPORTER: 'Edit Monitoring Exporter',
  'Please select Service': '請選擇 Service',
  'Path is Required': '請填寫 Path',
  VIRTUAL_IP: '虛擬 IP',
  VIRTUAL_IP_ADDRESS: 'Virtual IP address',

  SERVICE_TYPE_TCAP: '服務類型',
  SERVICE_TYPE_DESC: 'Select a Service type.',
  SELECT_SERVICE_TYPE_DESC:
    'Create a stateless or stateful Service, or map a Service to an external Service.',
  APP_SELECT_SERVICE_TYPE_DESC: 'Create a stateless or stateful Service.',
  JAVA: 'Java',
  NODEJS: 'Node.js',
  PYTHON: 'Python',
  BINARY: 'Binary',
  ACCESS_INFORMATION: '服務訪問',
  STATELESS_SERVICE: '無狀態服務',
  STATEFUL_SERVICE: '有狀態服務',
  EXTERNAL_SERVICE: '外部服務',
  'Simple Service': '簡單服務',
  'Associated Application': '關聯應用',
  'Service Mesh': '服務治理',

  'Internal access': '内部訪問',
  ACCESS_TYPE: '訪問類型',
  INTERNAL_ACCESS_MODE: 'Internal Access Mode',

  'Service Name': '服務名稱',
  'Please input service name': '請輸入服務名稱',
  EXTERNAL_SERVICE_ADDRESS_EMPTY_DESC: '請輸入 ExternalName。',
  SPECIFY_WORKLOAD: '指定工作負載',
  SPECIFY_WORKLOAD_TO_CREATE_SERVICE: 'Specify Workload to Create Service',
  EDIT_YAML_TO_CREATE_SERVICE: 'Edit YAML to Create Service',
  CREATE_EXTERNAL_SERVICE: 'Create External Service',
  'Specify Node': '指定節點',
  'Please input ExternalName': '請輸入 ExternalName',
  'Specify Workload': '指定工作負載',
  SPECIFY_NODE: '指定節點',
  'Add Selector': '添加選擇器',

  AUTO_REFRESH: '自动',

  INVALID_PORT_DESC: 'Please enter a valid port number.',
  INVALID_PORT: '端口無效。',
  'Not Associate': '不關聯',

  CUSTOM_SERVICE: 'Custom Service',
  CUSTOMIZE_SERVICE: 'Customize Service',
  'Create service by specifying workloads': '指定工作負載創建服務',
  'Create service by Yaml': '通過 Yaml 創建服務',

  'Sure to delete the service(s)?': '確認刪除服務',
  NO_SERVICE_RELATED_RESOURCE_DESC: '目前服務下沒有關聯的資源',
  NO_WORKLOAD_RELATED_RESOURCE_DESC:
    'No resource related to the workload is found.',

  'Automatically assign Service IP': '自動分配服務 IP',
  'Do not assign Service IP': '不分配服務 IP',
  'Map Services outside the cluster': '映射集群外部的服務',
  ENTER_PORT_NUMBER: '請輸入端口',
  PORT_EMPTY: '請輸入端口',
  'Please select a workload': '請選擇一個工作負載',
  ENTER_SELECTOR_TIP: 'Please set a workload selector.',
  TOTAL_WORKLOADS_VALUE: '共 {count} 個工作負載',

  STICKY_SESSION: '會話保持',
  MAXIMUM_STICKINESS_DURATION: '最大會話保持時間（s）',
  STICKY_SESSION_DESC:
    'Set the system to forward all requests from the same client to the same backend within a specified duration.',

  SERVICE_NAME_DESC:
    'The name can contain only lowercase letters, numbers, and hyphens (-), must start with a lowercase letter, and must end with a lowercase letter or number. The maximum length is 63 characters.',

  SERVICE_DESC:
    'Services provide an abstract way to expose applications running on a Pod as network services.',
  SERVICE_EMPTY_DESC: 'Please create a Service.',

  SERVICES_BASEINFO_DESC:
    '創建服務需要提供服務的名稱和描述，服務名稱不能和同一項目下已有的服務名稱相同。',
  SERVICES_SETTINGS_DESC: '服務設置定義了如何來訪問已有的工作負載。',

  CREATE_EXTERNAL_SERVICE_DESC:
    '通過返回 CNAME 和它的值，可以將服務映射到 externalName 字段的内容',

  ACCESS_NONE_TIP: '不提供外網訪問。',
  ACCESS_NODEPORT_TIP: '通過集群節點的對應端口來訪問服務。',
  ACCESS_LOADBALANCER_TIP: '通過負載平衡器來訪問服務。',

  'The current selector': '目前設置的選擇器',
  NO_WORKLOAD_MATCH_SELECTOR: 'The current selector matches no workload.',
  WORKLOADS_MATCH_SELECTOR_SI:
    'The current selector ({selector}) matches {count} workload.',
  WORKLOADS_MATCH_SELECTOR_PL:
    'The current selector ({selector}) matches {count} workloads.',
  'Commonly included tags in the current workloads':
    '目前的工作負載中共同包含的標籤',
  SERVICE_SELECTOR_AFFECT_2: '共影響到 {count} 個工作負載',
  ' has no corresponding workload.': '沒有對應的工作負載',
  'Please input selectors that have corresponding workloads':
    '請輸入有對應工作負載的選擇器',
  Creating: '正在創建',
  'Creation failed, please delete and try again': '創建失敗，請刪除後重試',

  ADD_ROUTING_RULE: '添加路由規則',

  VIRTUAL_IP_TITLE: 'Virtual IP Address',
  VIRTUAL_IP_DESC:
    'The cluster generates a unique IP address for the Service and the Service can be accessed within the cluster using this IP address.',
  INTERNAL_DOMAIN_NAME: 'Internal Domain Name',
  INTERNAL_DOMAIN_NAME_DESC:
    'The cluster does not generate an IP address for the Service and the Service can be directly accessed using the Endpoint IP address of the Service.',
  HEADLESS_EXTERNAL_NAME_TITLE:
    '映射集群外部的地址來訪 Headless (externalname)',
  HEADLESS_EXTERNAL_NAME_DESC: '將集群或者項目外部服務映射到集群或項目内。',

  SERVICE_EXTERNAL_ACCESS_DESC: '將服務暴露给外網',

  SERVICE_NODE_PORT_DESC:
    '如果您目前的網路與集群節點在同一網路内，那麼您可以透通<集群 IP 地址>:<NodePort>進行訪問，或者通過<節點 IP 地址>:<NodePort>進行訪問。',

  SERVICE_TYPE: 'Service Type',
  SELECT_SERVICE_TYPE: 'Select Service Type',

  SELECT_WORKLOAD_DESC: '將工作負載所創建的容器組副本的 Label 作為預填充内容。',

  SPECIFY_NODE_DESC: '指定節點可以將節點的 Label 作為預填充內容',

  SERVICE_TYPES_Q: '服務的類型',
  SERVICE_TYPES_A:
    '服務分為無狀態服務 (Virtual Service + Depolyment) 及有狀態服務 (Headless Service +Statefulset), 無狀態服務中多個副本可以共享一個儲存卷、有狀態服務需要擁有自己獨立的儲存卷',

  SCENARIOS_FOR_SERVICES_Q: '無狀態服務和有狀態服務的使用場景?',
  SCENARIOS_FOR_SERVICES_A:
    '無狀態服務適用於不需要數據持久化的場景，並且多個實例對統一請求的響應式相同的場景(例如 Nginx、Tomcat 等)；有狀態服務適用於需要數據儲存功能的服務、或者指多線程類型的服務，列隊等 (mysql 資料庫、kafka、zookeeper 等)。',
  STATEFUL_SERVICE_DESC:
    '有狀態服務用來管理有狀態應用，可以保證部署和擴容縮容的順序，提供了穩定的持久化儲存和網路標識，有序伸縮等',
  STATELESS_SERVICE_DESC:
    '容器服務中最常用的一種服務，通過定義容器組模板來控制容器組狀態，包括滾動升級和回滾',
  SERVICE_FROM_CODE: '通過代碼構建新的服務',
  SERVICE_FROM_ARTIFACT: '通過成品構建新的服務',
  SERVICE_FROM_CODE_DESC:
    '您可以將已有的代碼通過  Source to Image 的方式構建成鏡像並部署',
  SERVICE_FROM_ARTIFACT_DESC: '您可以將已有成品構建成新的鏡像並完成部署',
  LANGUAGE_TYPE_VALUE: '語言類型：{value}',
  ARTIFACT_TYPE_VALUE: 'Artifact Type: {value}',
  SPECIFY_WORKLOAD_DESC: '通過已有的容器組來創建服務',
  DELETE_SERVICE_DESC_SI:
    '您即將刪除服務 {resource}，請您進行確認是否刪除關聯資源?',
  DELETE_SERVICE_DESC_PL:
    '您即將刪除服務 {resource}，請您進行確認是否刪除關聯資源?',

  CUSTOMIZE_SERVICE_DESC:
    '您可以通過指定工作負載或者編輯配置 (Yaml) 來創建服務',

  SERVICE_TYPE_STATEFULSERVICE: '有狀態服務',
  SERVICE_TYPE_STATELESSSERVICE: '無狀態服務',
  SERVICE_TYPE_EXTERNALSERVICE: '映射外部服務',
  SERVICE_TYPE_STATEFULSERVICE_SCAP: 'Stateful service',
  SERVICE_TYPE_STATELESSSERVICE_SCAP: 'Stateless service',
  SERVICE_TYPE_EXTERNALSERVICE_SCAP: 'External service',

  SERVICE_PORTS_DESC: 'Set the container ports and Service ports.',

  INTERNAL_DOMAIN_NAME_SCAP: '集群内部訪問方式(DNS)',

  MAXIMUM_STICKINESS_DURATION_DESC:
    'Set a maximum stickiness duration. The value range is 0 to 86400 and the default value is 10800.',

  // Services
  WORKLOAD_SELECTOR: 'Workload Selector',
  UNKNOWN_SERVICE_TYPE: 'Unknown Service Type',
  HEADLESS: 'Headless',
  EXTERNALNAME: 'ExternalName',
  EXTERNAL_SERVICE_ADDRESS: 'External Service Address',
  EXTERNAL_SERVICE_ADDRESS_DESC:
    'Enter the domain name of an external Service.',
  UNKNOWN: 'Unknown',
  EXTERNALNAME_EXAMPLE: 'Example: ',
  PORT_PL: 'Ports',
  ENDPOINT: 'Endpoint',
}
