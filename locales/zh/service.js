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
  services: '服务',
  routes: '应用路由',
  Ports: '端口',
  selector: '选择器',
  Selector: '选择器',
  'External Address': '外部地址',
  'LoadBalancer IP': '负载均衡 IP',
  CREATE_SERVICE: '创建服务',
  'Delete Service': '删除服务',
  ACCESS_METHOD: '访问方式',
  'Target Port': '目标端口',
  CONTAINER_PORT: '容器端口',
  CONTAINER_PORT_VALUE: '容器端口：{value}',
  SERVICE_PORT: '服务端口',
  SERVICE_PORT_VALUE: '服务端口：{value}',
  'Node Port': '节点端口',
  'Node Port(s)': '节点端口',
  EDIT_SERVICE: '编辑服务',
  EDIT_EXTERNAL_ACCESS: '编辑外网访问',
  'Please select Service': '请选择 Service',
  'Path is Required': '请填写 Path',
  VIRTUAL_IP: '虚拟 IP 地址',

  SERVICE_TYPE_TCAP: '服务类型',
  SERVICE_TYPE_DESC: '选择一个服务类型。',
  SELECT_SERVICE_TYPE_DESC:
    '创建一个无状态或有状态服务，或将一个服务映射到外部服务。',
  APP_SELECT_SERVICE_TYPE_DESC: '创建一个无状态或有状态服务。',
  'Service Access': '服务访问',
  STATELESS_SERVICE: '无状态服务',
  STATEFUL_SERVICE: '有状态服务',
  EXTERNAL_SERVICE: '外部服务',
  'Simple Service': '简单服务',
  'Associated Application': '关联应用',
  'Service Mesh': '服务治理',

  'Internal access': '内部访问',
  ACCESS_TYPE: '访问类型',

  'Service Name': '服务名称',
  'Please input service name': '请输入服务名称',
  ENTER_EXTERNALNAME_DESC: '请输入 ExternalName。',
  SPECIFY_WORKLOAD: '指定工作负载',
  SPECIFY_WORKLOAD_TO_CREATE_SERVICE: '指定工作负载创建服务',
  EDIT_YAML_TO_CREATE_SERVICE: '编辑配置文件创建服务',
  CREATE_EXTERNAL_SERVICE: '创建外部服务',
  SPECIFY_NODE: '指定节点',
  'Add Selector': '添加选择器',

  INVALID_PORT_DESC: '请输入有效协议或端口号。',
  'Please input ExternalName': '请输入 ExternalName',
  'Specify Workload': '指定工作负载',

  SPECIFY_NODE: '指定节点',

  INVALID_PORT: '端口无效。',
  'Not Associate': '不关联',

  Auto: '自动',

  CUSTOM_SERVICE: '自定义服务',
  CUSTOMIZE_SERVICE: '自定义服务',
  'Create service by specifying workloads': '指定工作负载创建服务',
  'Create service by Yaml': '通过 Yaml 创建服务',

  'Sure to delete the service(s)?': '确认删除服务',
  'No related resources found with current service(s)':
    '当前服务下没有关联的资源',

  'Automatically assign Service IP': '自动分配服务 IP',
  'Do not assign Service IP': '不分配服务 IP',
  'Map Services outside the cluster': '映射集群外部的服务',
  ENTER_PORT_NUMBER: '请输入端口号。',
  PORT_EMPTY: '请设置端口。',
  'Please select a workload': '请选择一个工作负载',
  ENTER_SELECTOR_TIP: '请设置工作负载选择器。',
  TOTAL_WORKLOADS_VALUE: '工作负载总数：{count}',

  STICKY_SESSION: '会话保持',
  MAXIMUM_STICKINESS_DURATION: '最长会话保持时间（s）',
  STICKY_SESSION_DESC:
    '设置系统在指定的时间内将同一个会话中来自同一个客户端的请求全部转发给同一个容器组。',

  SERVICE_NAME_DESC:
    '名称只能包含小写字母、数字和连字符（-），必须以小写字母开头并以小写字母或数字结尾，最长 63 个字符。',

  SERVICE_DESC:
    '服务（Service）提供一种抽象的方法，将运行在容器组（Pod）上的应用程序公开为网络服务。',
  SERVICE_EMPTY_DESC: '请创建一个服务。',

  SERVICES_BASEINFO_DESC:
    '创建服务需要提供服务的名称和描述，服务名称不能和同一项目下已有的服务名称相同。',
  SERVICES_SETTINGS_DESC: '服务设置定义了如何来访问已有的工作负载。',

  CREATE_EXTERNAL_SERVICE_DESC: '创建一个服务并将其映射到一个外部服务。',

  ACCESS_NONE_TIP: '不提供外网访问，只能在集群内访问服务。',
  ACCESS_NODEPORT_TIP: '通过集群节点的对应端口来访问服务。',
  ACCESS_LOADBALANCER_TIP: '通过负载均衡器来访问服务。',

  'The current selector': '当前设置的选择器',
  NO_WORKLOAD_MATCH_SELECTOR: '没有工作负载匹配当前选择器。',
  WORKLOADS_MATCH_SELECTOR_SI:
    '当前选择器（{selector}）与 {count} 个工作负载匹配。',
  WORKLOADS_MATCH_SELECTOR_PL:
    '当前选择器（{selector}）与 {count} 个工作负载匹配。',
  'Commonly included tags in the current workloads':
    '当前的工作负载中共同包含的标签',
  SERVICE_SELECTOR_AFFECT_2: '共影响到 {count} 个工作负载',
  ' has no corresponding workload.': '没有对应的工作负载',
  'Please input selectors that have corresponding workloads':
    '请输入有对应工作负载的选择器',
  Creating: '正在创建',
  'Creation failed, please delete and try again': '创建失败，请删除后重试',

  ADD_ROUTING_RULE: '添加路由规则',
  EDIT_ROUTING_RULE: '编辑路由规则',

  VIRTUAL_IP_TITLE: '虚拟 IP 地址',
  VIRTUAL_IP_DESC: '为服务分配虚拟 IP 地址用于集群内部访问。',
  INTERNAL_DOMAIN_NAME: '内部域名',
  INTERNAL_DOMAIN_NAME_DESC:
    '不为服务分配 IP 地址，服务后端的容器组可通过集群的 DNS 机制在集群内部访问。',
  HEADLESS_EXTERNAL_NAME_TITLE:
    '映射集群外部的地址来访 Headless (externalname)',
  HEADLESS_EXTERNAL_NAME_DESC: '将集群或者项目外部服务映射到集群或项目内。',

  SERVICES_INTERNET_ACCESS_DESC: '将服务暴露给外网。',

  SERVICE_NODE_PORT_DESC:
    '如果您当前的网络与集群节点在同一网络内，那么您可以通集群IP地址+节点端口号进行访问，或者通过节点 IP+节点端口进行访问',

  SERVICE_TYPE: '服务类型',
  SELECT_SERVICE_TYPE: '选择服务类型',

  SELECT_WORKLOAD_DESC: '使用工作负载的标签作为选择器。',

  SPECIFY_NODE_DESC: '将节点的标签作为预填充内容',

  SERVICE_TYPES_Q: 'KubeSphere 支持哪些服务类型？',
  SERVICE_TYPES_A:
    'KubeSphere 支持无状态服务和有状态服务。无状态服务中的多个容器组副本共享一个存储卷，有状态服务中的每个容器组副本都拥有独立的存储卷。',

  SCENARIOS_FOR_SERVICES_Q: '无状态服务和有状态服务分别适用于哪些场景？',
  SCENARIOS_FOR_SERVICES_A:
    '无状态服务适用于不需要数据持久化的场景，例如 Nginx 和 Tomcat。有状态服务适用于需要数据持久化的场景，例如 MySQL 数据库、Kafka 和 ZooKeeper。',
  STATEFUL_SERVICE_DESC:
    '有状态服务用来管理有状态应用，可以保证部署和扩容缩容的顺序，提供了稳定的持久化存储和网络标识，有序伸缩等',
  STATELESS_SERVICE_DESC:
    '容器服务中最常用的一种服务，通过定义容器组模板来控制容器组状态，包括滚动升级和回滚',
  SERVICE_FROM_CODE: '通过代码创建服务',
  SERVICE_FROM_ARTIFACT: '通过制品创建服务',
  SERVICE_FROM_CODE_DESC: '将现有的源码构建成镜像并部署。',
  SERVICE_FROM_ARTIFACT_DESC: '将现有的制品构建成镜像并部署。',
  JAVA: 'Java',
  NODEJS: 'Node.js',
  PYTHON: 'Python',
  BINARY: '二进制',
  LANGUAGE_TYPE_VALUE: '语言类型：{value}',
  ARTIFACT_TYPE_VALUE: '制品类型：{value}',
  SPECIFY_WORKLOAD_DESC: '使用一个或多个现有的工作负载创建来创建服务。',
  DELETE_SERVICE_DESC:
    '您即将删除服务 {resource}，请您进行确认是否删除关联资源?',

  CUSTOMIZE_SERVICE_DESC: '通过指定工作负载或编辑 YAML 配置文件来创建服务。',

  SERVICE_TYPE_STATEFULSERVICE: '有状态服务',
  SERVICE_TYPE_STATELESSSERVICE: '无状态服务',
  SERVICE_TYPE_EXTERNALSERVICE: '映射外部服务',

  SERVICE_PORTS_DESC: '设置用于访问容器的端口以及服务端口。',

  EIP_POOL_DESC: '集群内部访问方式(DNS)',

  MAXIMUM_STICKINESS_DURATION_DESC:
    '设置最大会话保持时间。取值范围为 0 到 86400，默认值 10800。',

  // Services
  WORKLOAD_SELECTOR: '工作负载选择器',
  NONE: '无',
  UNKNOWN_SERVICE_TYPE: '未知服务类型',
  HEADLESS: 'Headless',
  EXTERNALNAME: 'ExternalName',
  UNKNOWN: '未知',
  EXTERNALNAME_EXAMPLE: '例如：',
  PORTS: '端口',
}
